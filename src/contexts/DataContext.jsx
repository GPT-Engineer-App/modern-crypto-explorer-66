import { createContext, useState, useEffect, useRef, useCallback, useMemo } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [bitcoinData, setBitcoinData] = useState([]);
  const [historicalDataLastFetched, setHistoricalDataLastFetched] = useState(null);

  const fetchAssetsRef = useRef();
  const historicalDataFetchRef = useRef();
  const previousDayTotalMarketCap = useRef(0);

  const fetchAssets = useCallback(async () => {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const data = await response.json();
    setAssets(data.data);
  }, []);

  const fetchHistoricalData = useCallback(async () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    if (historicalDataLastFetched && historicalDataLastFetched > twentyFourHoursAgo) {
      return;
    }

    const endDate = new Date().getTime();
    const startDate = endDate - 60 * 24 * 60 * 60 * 1000;
    const response = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`);
    const data = await response.json();
    setBitcoinData(data.data);
    setHistoricalDataLastFetched(Date.now());
  }, [historicalDataLastFetched]);

  useEffect(() => {
    fetchAssetsRef.current = fetchAssets;
    historicalDataFetchRef.current = fetchHistoricalData;
  }, [fetchAssets, fetchHistoricalData]);

  useEffect(() => {
    fetchAssets();
    fetchHistoricalData();
    const assetsInterval = setInterval(fetchAssets, 10000);

    return () => clearInterval(assetsInterval);
  }, [fetchAssets, fetchHistoricalData]);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("favorites");
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const calculateDominance = (assetSymbol) => {
    const totalMarketCap = assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0);
    const asset = assets.find((a) => a.symbol === assetSymbol);
    return asset ? ((parseFloat(asset.marketCapUsd) / totalMarketCap) * 100).toFixed(2) : "0";
  };

  const calculateTotalVolume = () => {
    const totalVolume = assets.reduce((acc, asset) => acc + parseFloat(asset.volumeUsd24Hr || 0), 0);
    return (totalVolume / 1e9).toFixed(2); // Convert to billions
  };

  const calculateTotalMarketCap = () => {
    return assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0) / 1e12; // Convert to trillions
  };

  const calculateMarketDirection = (assetSymbol) => {
    const asset = assets.find((a) => a.symbol === assetSymbol);
    if (asset && !isNaN(parseFloat(asset.changePercent24Hr))) {
      return parseFloat(asset.changePercent24Hr) > 0 ? "up" : "down";
    }
    return "neutral"; // Return 'neutral' if the asset is not found or changePercent24Hr is not a number
  };

  const totalMarketCap = useMemo(() => calculateTotalMarketCap(), [assets]);
  const marketDirection = useMemo(() => calculateMarketDirection("BTC"), [assets]);
  const btcDominance = useMemo(() => calculateDominance("BTC"), [assets]);
  const ethDominance = useMemo(() => calculateDominance("ETH"), [assets]);
  const totalVolume = useMemo(() => calculateTotalVolume(), [assets]);

  return <DataContext.Provider value={{ assets, setAssets, bitcoinData, setBitcoinData, favorites, setFavorites, marketDirection, totalMarketCap, btcDominance, ethDominance, totalVolume }}>{children}</DataContext.Provider>;
};