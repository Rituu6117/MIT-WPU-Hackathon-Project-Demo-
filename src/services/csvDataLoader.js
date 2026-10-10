import Papa from 'papaparse';

let cachedRecords = null;
let isFetching = false;
let fetchPromise = null;

export const loadMarketData = async () => {
  if (cachedRecords) return cachedRecords;
  if (isFetching) return fetchPromise;

  isFetching = true;
  fetchPromise = new Promise((resolve, reject) => {
    Papa.parse('/daily_price.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleanedData = results.data.map((item, idx) => {
          const minPrice = parseFloat(item['Min Price']) || 0;
          const maxPrice = parseFloat(item['Max Price']) || 0;
          const modalPrice = parseFloat(item['Modal Price']) || minPrice || maxPrice || 0;

          return {
            id: `mkt-${idx}`,
            state: (item.State || '').trim(),
            district: (item.District || '').trim(),
            market: (item.Market || '').trim(),
            commodity: (item.Commodity || '').trim(),
            variety: (item.Variety || '').trim(),
            grade: (item.Grade || 'FAQ').trim(),
            minPrice,
            maxPrice,
            modalPrice
          };
        }).filter(item => item.commodity && item.modalPrice > 0);

        cachedRecords = cleanedData;
        isFetching = false;
        resolve(cleanedData);
      },
      error: (err) => {
        isFetching = false;
        console.error('CSV Parsing Error:', err);
        reject(err);
      }
    });
  });

  return fetchPromise;
};

export const getUniqueStates = (data) => {
  const states = new Set(data.map(d => d.state).filter(Boolean));
  return Array.from(states).sort();
};

export const getDistrictsForState = (data, stateName) => {
  if (!stateName) return [];
  const districts = new Set(
    data.filter(d => d.state === stateName).map(d => d.district).filter(Boolean)
  );
  return Array.from(districts).sort();
};

export const getUniqueCommodities = (data) => {
  const commodities = new Set(data.map(d => d.commodity).filter(Boolean));
  return Array.from(commodities).sort();
};

export const filterMarketData = (data, { commodity, state, district, searchQuery }) => {
  if (!data || !Array.isArray(data)) return [];

  let result = [...data];

  if (commodity && commodity !== 'ALL') {
    const searchComm = commodity.toLowerCase();
    result = result.filter(d => 
      d.commodity.toLowerCase().includes(searchComm) || 
      searchComm.includes(d.commodity.toLowerCase())
    );
  }

  if (state && state !== 'ALL') {
    result = result.filter(d => d.state === state);
  }

  if (district && district !== 'ALL') {
    result = result.filter(d => d.district === district);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(d =>
      d.market.toLowerCase().includes(q) ||
      d.commodity.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q)
    );
  }

  // Sort descending by Modal Price so highest rates are on top
  result.sort((a, b) => b.modalPrice - a.modalPrice);

  return result;
};

/**
 * Identify the Best Market from filtered list based on highest modal price
 */
export const findBestMarket = (marketList) => {
  if (!marketList || marketList.length === 0) return null;
  return marketList.reduce((best, current) => 
    current.modalPrice > best.modalPrice ? current : best, marketList[0]
  );
};
