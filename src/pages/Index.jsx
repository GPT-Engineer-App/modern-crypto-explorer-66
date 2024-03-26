import React, { useState, useEffect, useMemo } from "react";
import { Box, Heading, Text, Flex, Spacer, Button, useColorMode, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Image, Grid, GridItem, Icon, Stack, Link, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGasPump, FaStar, FaBitcoin, FaSearch, FaArrowUp } from "react-icons/fa";
import { cryptoData } from "../data/MockData";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sortConfig, setSortConfig] = useState({ key: "marketCap", direction: "descending" });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (name) => {
    const updatedCryptoData = cryptoData.map((crypto) => {
      if (crypto.name === name) {
        return { ...crypto, isFavorite: !crypto.isFavorite };
      }
      return crypto;
    });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const filteredCryptoData = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return sortedCryptoData.filter((crypto) => crypto.name.toLowerCase().includes(lowercaseQuery) || crypto.shortName.toLowerCase().includes(lowercaseQuery));
  }, [searchQuery, sortedCryptoData]);

  const filteredNews = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return [
      {
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
        text: "Bitcoin reaches new all-time high as institutional investors flock to crypto",
      },
    ].filter((item) => item.text.toLowerCase().includes(lowercaseQuery));
  }, [searchQuery]);

  const filteredMostWanted = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return [
      { name: "Ethereum", change: "+5.2%" },
      { name: "Cardano", change: "-2.1%" },
      { name: "Polkadot", change: "+8.7%" },
    ].filter((item) => item.name.toLowerCase().includes(lowercaseQuery));
  }, [searchQuery]);

  const filteredMarketWhispers = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return [
      {
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
        text: "Tune in to our latest podcast episode discussing the future of DeFi",
      },
    ].filter((item) => item.text.toLowerCase().includes(lowercaseQuery));
  }, [searchQuery]);

  return (
    <Box align="center" fontFamily="Nunito">
      {}
      <Box>
        <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
          <Flex maxWidth="1200" fontWeight="bold" mr={8}>
            <Text mr={8}>📈 Markets</Text>
            <Text mr={8}>📰 Blog</Text>
            <Text mr={8}>🧭 Explore</Text>
            <Text mr={8}>🎓 Learn</Text>
          </Flex>
          <Flex alignItems="center">{}</Flex>
        </Flex>
        <Flex bg="gray.50" px={4} py={2} alignItems="center" justifyContent="space-between" maxWidth="1200" mx="auto">
          <Text fontWeight="bold" color="#5A4FCF">
            Cryptos: 4,000M <Spacer mx={2} /> Exchanges: 300 <Spacer mx={2} /> Market Cap: $2.79T <Icon as={FaArrowUp} color="green.500" mx={1} /> <Spacer mx={2} /> 24h Vol: $200B
          </Text>
          <Spacer />
        </Flex>
      </Box>
      {}
      <Flex px={4} py={2} alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" boxShadow="md">
        <Flex maxWidth="1200" fontWeight="bold" mr={8}>
          <Text mr={8}>📈 Markets</Text>
          <Text mr={8}>📰 Blog</Text>
          <Text mr={8}>🧭 Explore</Text>
          <Text mr={8}>🎓 Learn</Text>
        </Flex>
        <Flex alignItems="center">
          <InputGroup mr={4} width="200px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input type="search" placeholder="Search..." bg="gray.100" size="sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </InputGroup>
          <Flex alignItems="center" mr={4}>
            <Icon as={FaGasPump} mr={2} />
            <Text>
              ETH Gas{" "}
              <Text as="span" fontWeight="bold" color="#5A4FCF">
                50 Gwei
              </Text>
            </Text>
          </Flex>
          <Button onClick={toggleColorMode} mr={4}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button variant="outline" borderColor="gray.200" mr={4}>
            Login
          </Button>
          <Button bg="#5A4FCF" color="white">
            Sign up
          </Button>
        </Flex>
      </Flex>

      {}
      <Box textAlign="center" my={16} mx={8}>
        <Heading mb={4}>The Latest Crypto Market Data</Heading>
        <Text fontSize="xl" color="gray.600">
          The global cryptocurrency market cap today is{" "}
          <Text as="span" fontWeight="bold">
            $2.79 Trillion
          </Text>
          , a{" "}
          <Text as="span" fontWeight="bold" color="green.400">
            {sortedCryptoData.some((data) => data.percentChange24h > 0) ? "+" : ""}7.2%
          </Text>{" "}
          change in the last 24 hours.🚀
        </Text>
        <Box width="420px" mx="auto" mt={8} borderWidth={1} borderColor="gray.200" borderRadius="md" boxShadow="md" p={6} align="center" backgroundColor="gray.50">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            <Icon as={FaBitcoin} color="orange.400" mr={2} />
            Fear & Greed Index
          </Text>
          <Box width="200px" height="100px" borderTopLeftRadius="100px" borderTopRightRadius="100px" borderWidth="10px" borderColor="gray.200" borderBottom="0" position="relative" boxSizing="border-box">
            <Text fontSize="6xl" fontWeight="black" color="green.500" position="absolute" top="60%" left="50%" transform="translate(-50%, -50%)">
              87
            </Text>
          </Box>
          <Text mt={4} fontWeight="bold" color="gray.600" textAlign="center">
            Extreme greed 🤑
          </Text>
          <Text fontSize="sm" fontWeight="normal" color="gray.500" textAlign="center">
            Last updated: March 25, 2024
          </Text>
        </Box>
      </Box>

      {/* Market data */}
      <Box overflowX="auto" maxWidth="1200">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Button onClick={() => requestSort("name")} variant="link">
                  Name
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("price")} variant="link">
                  Price
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange1h")} variant="link">
                  1h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange24h")} variant="link">
                  24h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange7d")} variant="link">
                  7d%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("marketCap")} variant="link">
                  Market Cap
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("volume24h")} variant="link">
                  Volume (24h)
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("circulatingSupply")} variant="link">
                  Circulating Supply
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCryptoData.map((crypto) => (
              <Tr key={crypto.name}>
                <Td>
                  <Icon as={FaStar} color={crypto.isFavorite ? "yellow.500" : "gray.300"} onClick={() => toggleFavorite(crypto.name)} _hover={{ cursor: "pointer" }} />
                </Td>
                <Td>
                  <Text fontWeight="bold">{crypto.name}</Text>
                  <Text fontWeight="bold" color="gray.500">
                    {crypto.shortName}
                  </Text>
                </Td>
                <Td fontWeight="bold">${crypto.price.toLocaleString()}</Td>
                <Td fontWeight="bold">
                  <Text color={crypto.percentChange1h >= 0 ? "green.400" : "red.400"}>{crypto.percentChange1h}%</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text color={crypto.percentChange24h >= 0 ? "green.400" : "red.400"}>{crypto.percentChange24h}%</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text color={crypto.percentChange7d >= 0 ? "green.400" : "red.400"}>{crypto.percentChange7d}%</Text>
                </Td>
                <Td fontWeight="bold">${crypto.marketCap.toLocaleString()}</Td>
                <Td fontWeight="bold">${crypto.volume24h.toLocaleString()}</Td>
                <Td fontWeight="bold">{crypto.circulatingSupply.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16} mx={8} maxWidth="1200">
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
            <Heading size="md" mb={4}>
              ✨Top News
            </Heading>
            {filteredNews.map((item, index) => (
              <Flex key={index}>
                <Image src={item.image} alt="News" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
                <Text>{item.text}</Text>
              </Flex>
            ))}
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
            <Heading size="md" mb={4}>
              🔥 Most Wanted
            </Heading>
            <Stack spacing={2}>
              {filteredMostWanted.map((item, index) => (
                <Flex key={index}>
                  <Text fontWeight="bold">
                    {index + 1}. {item.name}
                  </Text>
                  <Spacer />
                  <Text color={item.change.includes("+") ? "green.500" : "red.500"} fontWeight="bold">
                    {item.change}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%" backgroundColor={useColorModeValue("gray.50", "gray.700")}>
            <Heading size="md" mb={4}>
              🎙️ Market Whispers
            </Heading>
            {filteredMarketWhispers.map((item, index) => (
              <Flex key={index}>
                <Image src={item.image} alt="Podcast" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
                <Text>{item.text}</Text>
              </Flex>
            ))}
          </Box>
        </GridItem>
      </Grid>

      {}
      <Box bg="#5A4FCF" width="full" py={20}>
        <Heading textAlign="center" color="white" fontWeight="bold" mb={2}>
          Stay Ahead!💰
        </Heading>
        <Text textAlign="center" color="white" mb={4}>
          Subscribe to our newsletter for the latest news and insights.
        </Text>
        <Flex justifyContent="center">
          <Input placeholder="Enter your email" bg="purple.100" color="purple.900" mr={4} maxWidth="300px" />
          <Box position="relative">
            <Button bg="white" color="#5A4FCF" fontWeight="black" boxShadow="0 0 10px rgba(90, 79, 207, 0.5)" zIndex={1}>
              Subscribe
            </Button>
            <Box position="absolute" top="-4px" left="-4px" right="-4px" bottom="-4px" bg="transparent" borderRadius="md" boxShadow="0 0 20px rgba(90, 79, 207, 0.8)" zIndex={0} />
          </Box>
        </Flex>
      </Box>

      {}
      <Box bg={useColorModeValue("gray.50", "gray.800")} width="full">
        <Grid templateColumns="repeat(4, 1fr)" gap={8} color={useColorModeValue("gray.600", "gray.300")} py={8} maxWidth="1200px" mx="auto" fontWeight="bold">
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Explore
            </Text>
            <Stack color={useColorModeValue("gray.700", "gray.200")}>
              <Link>Cryptocurrencies</Link>
              <Link>Exchanges</Link>
              <Link>Wallets</Link>
              <Link>NFTs</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Tools</Text>
            <Stack color={useColorModeValue("gray.700", "gray.200")}>
              <Link>Portfolio Tracker</Link>
              <Link>Price Alerts</Link>
              <Link>Tax Calculator</Link>
              <Link>Trading Simulator</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Support</Text>
            <Stack color={useColorModeValue("gray.700", "gray.200")}>
              <Link>Help Center</Link>
              <Link>Contact Us</Link>
              <Link>FAQ</Link>
              <Link>Security</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Company</Text>
            <Stack color={useColorModeValue("gray.700", "gray.200")}>
              <Link>About Us</Link>
              <Link>Careers</Link>
              <Link>Blog</Link>
              <Link>Press</Link>
            </Stack>
          </GridItem>
        </Grid>
        <Flex justifyContent="center" color={useColorModeValue("gray.600", "gray.300")} maxWidth="1200" mx="auto">
          <Text m="4">© 2023 CryptoMarket. All rights reserved.</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
