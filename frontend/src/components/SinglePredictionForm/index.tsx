import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useTranslations } from '../../hooks/useTranslations';
import { GiSuperMushroom } from "react-icons/gi";
import type { MushroomData, PredictionResult } from '../../types/mushroom';
import { mushroomFields } from '../../types/mushroom';
import { mushroomApi } from '../../services/api';

const SinglePredictionForm: React.FC = () => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState<MushroomData>({
    'cap-shape': '',
    'cap-surface': '',
    'cap-color': '',
    'bruises': '',
    'odor': '',
    'gill-attachment': '',
    'gill-spacing': '',
    'gill-size': '',
    'gill-color': '',
    'stalk-shape': '',
    'stalk-root': '',
    'stalk-surface-above-ring': '',
    'stalk-surface-below-ring': '',
    'stalk-color-above-ring': '',
    'stalk-color-below-ring': '',
    'veil-color': '',
    'ring-number': '',
    'ring-type': '',
    'spore-print-color': '',
    'population': '',
    'habitat': '',
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleInputChange = (field: keyof MushroomData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
    setResult(null);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError(t('singlePrediction.errors.fillAllFields'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prediction = await mushroomApi.predict(formData);
      setResult(prediction);
      toast({
        title: t('singlePrediction.success.title'),
        description: `${t('singlePrediction.results.classifiedAs')} ${prediction.edible ? t('singlePrediction.success.edible') : t('singlePrediction.success.poisonous')}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('singlePrediction.errors.predictionError');
      setError(errorMessage);
      toast({
        title: t('singlePrediction.errors.predictionError'),
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      'cap-shape': '',
      'cap-surface': '',
      'cap-color': '',
      'bruises': '',
      'odor': '',
      'gill-attachment': '',
      'gill-spacing': '',
      'gill-size': '',
      'gill-color': '',
      'stalk-shape': '',
      'stalk-root': '',
      'stalk-surface-above-ring': '',
      'stalk-surface-below-ring': '',
      'stalk-color-above-ring': '',
      'stalk-color-below-ring': '',
      'veil-color': '',
      'ring-number': '',
      'ring-type': '',
      'spore-print-color': '',
      'population': '',
      'habitat': '',
    });
    setResult(null);
    setError(null);
  };

  return (
    <Card maxW="6xl" mx="auto" shadow="lg">
      <CardHeader>
        <Heading size="lg" color="teal.600" textAlign="center">
          <HStack spacing={2} justify="center">
            <GiSuperMushroom />
            <Text>{t('singlePrediction.title')}</Text>
          </HStack>
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" color="green.600" mb={4}>
                  {t('singlePrediction.sections.cap')}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.cap-shape')}</FormLabel>
                    <Select
                      value={formData['cap-shape']}
                      onChange={(e) => handleInputChange('cap-shape', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectShape')}
                    >
                      {mushroomFields['cap-shape'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.cap-shape.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.cap-surface')}</FormLabel>
                    <Select
                      value={formData['cap-surface']}
                      onChange={(e) => handleInputChange('cap-surface', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectSurface')}
                    >
                      {mushroomFields['cap-surface'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.cap-surface.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.cap-color')}</FormLabel>
                    <Select
                      value={formData['cap-color']}
                      onChange={(e) => handleInputChange('cap-color', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['cap-color'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.cap-color.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.bruises')}</FormLabel>
                    <Select
                      value={formData.bruises}
                      onChange={(e) => handleInputChange('bruises', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectBruises')}
                    >
                      {mushroomFields.bruises.map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.bruises.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.odor')}</FormLabel>
                    <Select
                      value={formData.odor}
                      onChange={(e) => handleInputChange('odor', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectOdor')}
                    >
                      {mushroomFields.odor.map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.odor.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
                <Heading size="md" color="blue.600" mb={4}>
                  {t('singlePrediction.sections.gills')}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.gill-attachment')}</FormLabel>
                    <Select
                      value={formData['gill-attachment']}
                      onChange={(e) => handleInputChange('gill-attachment', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectAttachment')}
                    >
                      {mushroomFields['gill-attachment'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.gill-attachment.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.gill-spacing')}</FormLabel>
                    <Select
                      value={formData['gill-spacing']}
                      onChange={(e) => handleInputChange('gill-spacing', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectSpacing')}
                    >
                      {mushroomFields['gill-spacing'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.gill-spacing.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.gill-size')}</FormLabel>
                    <Select
                      value={formData['gill-size']}
                      onChange={(e) => handleInputChange('gill-size', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectSize')}
                    >
                      {mushroomFields['gill-size'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.gill-size.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.gill-color')}</FormLabel>
                    <Select
                      value={formData['gill-color']}
                      onChange={(e) => handleInputChange('gill-color', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['gill-color'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.gill-color.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
                <Heading size="md" color="orange.600" mb={4}>
                  {t('singlePrediction.sections.stalk')}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-shape')}</FormLabel>
                    <Select
                      value={formData['stalk-shape']}
                      onChange={(e) => handleInputChange('stalk-shape', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectShape')}
                    >
                      {mushroomFields['stalk-shape'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-shape.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-root')}</FormLabel>
                    <Select
                      value={formData['stalk-root']}
                      onChange={(e) => handleInputChange('stalk-root', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectRoot')}
                    >
                      {mushroomFields['stalk-root'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-root.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-surface-above-ring')}</FormLabel>
                    <Select
                      value={formData['stalk-surface-above-ring']}
                      onChange={(e) => handleInputChange('stalk-surface-above-ring', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectSurface')}
                    >
                      {mushroomFields['stalk-surface-above-ring'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-surface-above-ring.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-surface-below-ring')}</FormLabel>
                    <Select
                      value={formData['stalk-surface-below-ring']}
                      onChange={(e) => handleInputChange('stalk-surface-below-ring', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectSurface')}
                    >
                      {mushroomFields['stalk-surface-below-ring'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-surface-below-ring.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-color-above-ring')}</FormLabel>
                    <Select
                      value={formData['stalk-color-above-ring']}
                      onChange={(e) => handleInputChange('stalk-color-above-ring', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['stalk-color-above-ring'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-color-above-ring.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.stalk-color-below-ring')}</FormLabel>
                    <Select
                      value={formData['stalk-color-below-ring']}
                      onChange={(e) => handleInputChange('stalk-color-below-ring', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['stalk-color-below-ring'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.stalk-color-below-ring.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
                <Heading size="md" color="purple.600" mb={4}>
                  {t('singlePrediction.sections.other')}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.veil-color')}</FormLabel>
                    <Select
                      value={formData['veil-color']}
                      onChange={(e) => handleInputChange('veil-color', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['veil-color'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.veil-color.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.ring-number')}</FormLabel>
                    <Select
                      value={formData['ring-number']}
                      onChange={(e) => handleInputChange('ring-number', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectNumber')}
                    >
                      {mushroomFields['ring-number'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.ring-number.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.ring-type')}</FormLabel>
                    <Select
                      value={formData['ring-type']}
                      onChange={(e) => handleInputChange('ring-type', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectType')}
                    >
                      {mushroomFields['ring-type'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.ring-type.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.spore-print-color')}</FormLabel>
                    <Select
                      value={formData['spore-print-color']}
                      onChange={(e) => handleInputChange('spore-print-color', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectColor')}
                    >
                      {mushroomFields['spore-print-color'].map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.spore-print-color.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.population')}</FormLabel>
                    <Select
                      value={formData.population}
                      onChange={(e) => handleInputChange('population', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectPopulation')}
                    >
                      {mushroomFields.population.map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.population.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>{t('singlePrediction.fields.habitat')}</FormLabel>
                    <Select
                      value={formData.habitat}
                      onChange={(e) => handleInputChange('habitat', e.target.value)}
                      placeholder={t('singlePrediction.placeholders.selectHabitat')}
                    >
                      {mushroomFields.habitat.map(option => (
                        <option key={option.value} value={option.value}>
                          {t(`mushroomOptions.habitat.${option.label}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <HStack justify="center" spacing={4}>
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  isLoading={loading}
                  loadingText={t('singlePrediction.loading')}
                  isDisabled={!isFormValid()}
                  px={8}
                >
                  {t('singlePrediction.buttons.analyze')}
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="lg"
                  px={8}
                >
                  {t('singlePrediction.buttons.clear')}
                </Button>
              </HStack>
            </VStack>
          </form>

          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert
              status={result.edible ? 'success' : 'warning'}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              py={8}
            >
              <AlertIcon boxSize="40px" />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {result.edible ? t('singlePrediction.results.edible') : t('singlePrediction.results.poisonous')}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {t('singlePrediction.results.classifiedAs')}{' '}
                <strong>{result.edible ? t('singlePrediction.success.edible') : t('singlePrediction.success.poisonous')}</strong>.
                {result.timestamp && (
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    {t('singlePrediction.results.analysisTime')} {new Date(result.timestamp).toLocaleString()}
                  </Text>
                )}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SinglePredictionForm;


