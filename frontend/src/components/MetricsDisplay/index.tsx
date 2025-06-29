import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { useTranslations } from '../../hooks/useTranslations';
import type { Metrics } from '../../types/mushroom';
import { mushroomApi } from '../../services/api';

const MetricsDisplay: React.FC = () => {
  const { t } = useTranslations();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchMetrics = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mushroomApi.getMetrics();
      setMetrics(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('metrics.errors.loadError');
      setError(errorMessage);
      toast({
        title: t('metrics.errors.loadError'),
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecalculateMetrics = async () => {
    setIsRecalculating(true);
    setError(null);

    try {
      const result = await mushroomApi.recalculateMetrics();
      setMetrics(result.metrics);
      toast({
        title: t('metrics.success.recalculated'),
        description: t('metrics.success.recalculatedMessage'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('metrics.errors.recalculateError');
      setError(errorMessage);
      toast({
        title: t('metrics.errors.recalculateError'),
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsRecalculating(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const formatPercentage = (value: number | null) => {
    if (value === null) return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return value.toLocaleString();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <Card maxW="4xl" mx="auto" shadow="lg">
        <CardBody>
          <VStack spacing={4}>
            <Spinner size="xl" color="teal.500" />
            <Text>{t('metrics.loading')}</Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card maxW="4xl" mx="auto" shadow="lg">
      <CardHeader>
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="teal.600">
              {t('metrics.title')}
            </Heading>
            <Text color="gray.600" mt={2}>
              {t('metrics.description')}
            </Text>
          </Box>
          <Button
            onClick={handleRecalculateMetrics}
            colorScheme="teal"
            variant="outline"
            size="sm"
            isLoading={isRecalculating}
            loadingText={t('metrics.recalculating')}
            isDisabled={isRecalculating}
          >
            {t('metrics.refresh')}
          </Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {metrics?.warning && (
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>{t('metrics.warning')}</AlertTitle>
              <AlertDescription>{metrics.warning}</AlertDescription>
            </Alert>
          )}

          {metrics && (
            <>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Stat>
                  <StatLabel>{t('metrics.stats.accuracy')}</StatLabel>
                  <StatNumber color="teal.500">
                    {formatPercentage(metrics.accuracy)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.accuracy')}</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>{t('metrics.stats.f1Score')}</StatLabel>
                  <StatNumber color="blue.500">
                    {formatPercentage(metrics.f1_score)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.f1Score')}</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>{t('metrics.stats.precision')}</StatLabel>
                  <StatNumber color="purple.500">
                    {formatPercentage(metrics.precision)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.precision')}</StatHelpText>
                </Stat>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Stat>
                  <StatLabel>{t('metrics.stats.recall')}</StatLabel>
                  <StatNumber color="pink.500">
                    {formatPercentage(metrics.recall)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.recall')}</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>{t('metrics.stats.testSamples')}</StatLabel>
                  <StatNumber color="cyan.500">
                    {formatNumber(metrics.test_samples)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.testSamples')}</StatHelpText>
                </Stat>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Stat>
                  <StatLabel>{t('metrics.stats.datasetSize')}</StatLabel>
                  <StatNumber color="green.500">
                    {formatNumber(metrics.dataset_size)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.datasetSize')}</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>{t('metrics.stats.featuresUsed')}</StatLabel>
                  <StatNumber color="orange.500">
                    {formatNumber(metrics.features_used)}
                  </StatNumber>
                  <StatHelpText>{t('metrics.helpText.featuresUsed')}</StatHelpText>
                </Stat>
              </SimpleGrid>

              {metrics.class_distribution && (
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    {t('metrics.classDistribution.title')}
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box>
                      <Text fontSize="sm" color="gray.500">{t('metrics.classDistribution.edible')}</Text>
                      <Text fontWeight="medium" color="green.500">
                        {formatNumber(metrics.class_distribution.edible)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">{t('metrics.classDistribution.poisonous')}</Text>
                      <Text fontWeight="medium" color="red.500">
                        {formatNumber(metrics.class_distribution.poisonous)}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              )}

              <Box>
                <Text fontWeight="medium" mb={2}>
                  {t('metrics.modelInfo.title')}
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">{t('metrics.modelInfo.modelType')}</Text>
                    <Text fontWeight="medium">{metrics.model_type || 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">{t('metrics.modelInfo.lastUpdate')}</Text>
                    <Text fontWeight="medium">{formatDate(metrics.created_at)}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </>
          )}

          {!metrics && !error && (
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>{t('metrics.noMetrics')}</AlertTitle>
              <AlertDescription>
                {t('metrics.noMetricsDescription')}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default MetricsDisplay;


