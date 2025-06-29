import React, { useState, useCallback } from 'react';
import {
  Button,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  SimpleGrid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
  Input,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useTranslations } from '../../hooks/useTranslations';
import type { MushroomData, PredictionResult } from '../../types/mushroom';
import { mushroomApi } from '../../services/api';

const BatchPredictionForm: React.FC = () => {
  const { t } = useTranslations();
  const [csvData, setCsvData] = useState('');
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMushroom, setSelectedMushroom] = useState<{ data: MushroomData; prediction: PredictionResult; index: number } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvData.trim()) {
      toast({
        title: 'Erro',
        description: t('batchPrediction.errors.invalidCsv'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setPredictions([]);

    try {
      const lines = csvData.trim().split('\n');
      const headers = lines[0].split(',');
      const data: MushroomData[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const mushroom: MushroomData = {
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
        };

        headers.forEach((header, index) => {
          const key = header.trim() as keyof MushroomData;
          if (key in mushroom) {
            mushroom[key] = values[index]?.trim() || '';
          }
        });

        data.push(mushroom);
      }

      const results = await mushroomApi.predictBatch(data);
      setPredictions(results);

      toast({
        title: t('batchPrediction.success.title'),
        description: t('batchPrediction.success.description', { count: results.length }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('batchPrediction.errors.batchError');
      setError(errorMessage);
      toast({
        title: t('batchPrediction.errors.batchError'),
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (prediction: string) => {
    return prediction === 'edible' ? 'green' : 'red';
  };

  const getMushroomOptionName = (field: string, code: string) => {
    const optionMaps: Record<string, Record<string, string>> = {
      'cap-shape': {
        'b': t('mushroomOptions.cap-shape.Bell'),
        'c': t('mushroomOptions.cap-shape.Conical'),
        'x': t('mushroomOptions.cap-shape.Convex'),
        'f': t('mushroomOptions.cap-shape.Flat'),
        'k': t('mushroomOptions.cap-shape.Knobbed'),
        's': t('mushroomOptions.cap-shape.Sunken')
      },
      'cap-surface': {
        'f': t('mushroomOptions.cap-surface.Fibrous'),
        'g': t('mushroomOptions.cap-surface.Grooves'),
        'y': t('mushroomOptions.cap-surface.Scaly'),
        's': t('mushroomOptions.cap-surface.Smooth')
      },
      'cap-color': {
        'n': t('mushroomOptions.cap-color.Brown'),
        'b': t('mushroomOptions.cap-color.Buff'),
        'c': t('mushroomOptions.cap-color.Cinnamon'),
        'g': t('mushroomOptions.cap-color.Gray'),
        'r': t('mushroomOptions.cap-color.Green'),
        'p': t('mushroomOptions.cap-color.Pink'),
        'u': t('mushroomOptions.cap-color.Purple'),
        'e': t('mushroomOptions.cap-color.Red'),
        'w': t('mushroomOptions.cap-color.White'),
        'y': t('mushroomOptions.cap-color.Yellow')
      },
      'bruises': {
        't': t('mushroomOptions.bruises.Bruises'),
        'f': t('mushroomOptions.bruises.No Bruises')
      },
      'odor': {
        'a': t('mushroomOptions.odor.Almond'),
        'l': t('mushroomOptions.odor.Anise'),
        'c': t('mushroomOptions.odor.Creosote'),
        'y': t('mushroomOptions.odor.Fishy'),
        'f': t('mushroomOptions.odor.Foul'),
        'm': t('mushroomOptions.odor.Musty'),
        'n': t('mushroomOptions.odor.None'),
        'p': t('mushroomOptions.odor.Pungent'),
        's': t('mushroomOptions.odor.Spicy')
      },
      'gill-attachment': {
        'a': t('mushroomOptions.gill-attachment.Attached'),
        'd': t('mushroomOptions.gill-attachment.Descending'),
        'f': t('mushroomOptions.gill-attachment.Free'),
        'n': t('mushroomOptions.gill-attachment.Notched')
      },
      'gill-spacing': {
        'c': t('mushroomOptions.gill-spacing.Close'),
        'w': t('mushroomOptions.gill-spacing.Crowded'),
        'd': t('mushroomOptions.gill-spacing.Distant')
      },
      'gill-size': {
        'b': t('mushroomOptions.gill-size.Broad'),
        'n': t('mushroomOptions.gill-size.Narrow')
      },
      'gill-color': {
        'k': t('mushroomOptions.gill-color.Black'),
        'n': t('mushroomOptions.gill-color.Brown'),
        'b': t('mushroomOptions.gill-color.Buff'),
        'h': t('mushroomOptions.gill-color.Chocolate'),
        'g': t('mushroomOptions.gill-color.Gray'),
        'r': t('mushroomOptions.gill-color.Green'),
        'o': t('mushroomOptions.gill-color.Orange'),
        'p': t('mushroomOptions.gill-color.Pink'),
        'u': t('mushroomOptions.gill-color.Purple'),
        'e': t('mushroomOptions.gill-color.Red'),
        'w': t('mushroomOptions.gill-color.White'),
        'y': t('mushroomOptions.gill-color.Yellow')
      },
      'stalk-shape': {
        'e': t('mushroomOptions.stalk-shape.Enlarging'),
        't': t('mushroomOptions.stalk-shape.Tapering')
      },
      'stalk-root': {
        'b': t('mushroomOptions.stalk-root.Bulbous'),
        'c': t('mushroomOptions.stalk-root.Club'),
        'u': t('mushroomOptions.stalk-root.Cup'),
        'e': t('mushroomOptions.stalk-root.Equal'),
        'z': t('mushroomOptions.stalk-root.Rhizomorphs'),
        'r': t('mushroomOptions.stalk-root.Rooted'),
        '?': t('mushroomOptions.stalk-root.Missing')
      },
      'stalk-surface-above-ring': {
        'f': t('mushroomOptions.stalk-surface-above-ring.Fibrous'),
        'y': t('mushroomOptions.stalk-surface-above-ring.Scaly'),
        'k': t('mushroomOptions.stalk-surface-above-ring.Silky'),
        's': t('mushroomOptions.stalk-surface-above-ring.Smooth')
      },
      'stalk-surface-below-ring': {
        'f': t('mushroomOptions.stalk-surface-above-ring.Fibrous'),
        'y': t('mushroomOptions.stalk-surface-above-ring.Scaly'),
        'k': t('mushroomOptions.stalk-surface-above-ring.Silky'),
        's': t('mushroomOptions.stalk-surface-above-ring.Smooth')
      },
      'stalk-color-above-ring': {
        'n': t('mushroomOptions.stalk-color-above-ring.Brown'),
        'b': t('mushroomOptions.stalk-color-above-ring.Buff'),
        'c': t('mushroomOptions.stalk-color-above-ring.Cinnamon'),
        'g': t('mushroomOptions.stalk-color-above-ring.Gray'),
        'o': t('mushroomOptions.stalk-color-above-ring.Orange'),
        'p': t('mushroomOptions.stalk-color-above-ring.Pink'),
        'e': t('mushroomOptions.stalk-color-above-ring.Red'),
        'w': t('mushroomOptions.stalk-color-above-ring.White'),
        'y': t('mushroomOptions.stalk-color-above-ring.Yellow')
      },
      'stalk-color-below-ring': {
        'n': t('mushroomOptions.stalk-color-below-ring.Brown'),
        'b': t('mushroomOptions.stalk-color-below-ring.Buff'),
        'c': t('mushroomOptions.stalk-color-below-ring.Cinnamon'),
        'g': t('mushroomOptions.stalk-color-below-ring.Gray'),
        'o': t('mushroomOptions.stalk-color-below-ring.Orange'),
        'p': t('mushroomOptions.stalk-color-below-ring.Pink'),
        'e': t('mushroomOptions.stalk-color-below-ring.Red'),
        'w': t('mushroomOptions.stalk-color-below-ring.White'),
        'y': t('mushroomOptions.stalk-color-below-ring.Yellow')
      },
      'veil-color': {
        'n': t('mushroomOptions.veil-color.Brown'),
        'o': t('mushroomOptions.veil-color.Orange'),
        'w': t('mushroomOptions.veil-color.White'),
        'y': t('mushroomOptions.veil-color.Yellow')
      },
      'ring-number': {
        'n': t('mushroomOptions.ring-number.None'),
        'o': t('mushroomOptions.ring-number.One'),
        't': t('mushroomOptions.ring-number.Two')
      },
      'ring-type': {
        'c': t('mushroomOptions.ring-type.Cobwebby'),
        'e': t('mushroomOptions.ring-type.Evanescent'),
        'f': t('mushroomOptions.ring-type.Flaring'),
        'l': t('mushroomOptions.ring-type.Large'),
        'n': t('mushroomOptions.ring-type.None'),
        'p': t('mushroomOptions.ring-type.Pendant'),
        's': t('mushroomOptions.ring-type.Sheathing'),
        'z': t('mushroomOptions.ring-type.Zone')
      },
      'spore-print-color': {
        'k': t('mushroomOptions.spore-print-color.Black'),
        'n': t('mushroomOptions.spore-print-color.Brown'),
        'b': t('mushroomOptions.spore-print-color.Buff'),
        'h': t('mushroomOptions.spore-print-color.Chocolate'),
        'r': t('mushroomOptions.spore-print-color.Green'),
        'o': t('mushroomOptions.spore-print-color.Orange'),
        'u': t('mushroomOptions.spore-print-color.Purple'),
        'w': t('mushroomOptions.spore-print-color.White'),
        'y': t('mushroomOptions.spore-print-color.Yellow')
      },
      'population': {
        'a': t('mushroomOptions.population.Abundant'),
        'c': t('mushroomOptions.population.Clustered'),
        'n': t('mushroomOptions.population.Numerous'),
        's': t('mushroomOptions.population.Scattered'),
        'v': t('mushroomOptions.population.Several'),
        'y': t('mushroomOptions.population.Solitary')
      },
      'habitat': {
        'g': t('mushroomOptions.habitat.Grasses'),
        'l': t('mushroomOptions.habitat.Leaves'),
        'm': t('mushroomOptions.habitat.Meadows'),
        'p': t('mushroomOptions.habitat.Paths'),
        'u': t('mushroomOptions.habitat.Urban'),
        'w': t('mushroomOptions.habitat.Waste'),
        'd': t('mushroomOptions.habitat.Woods')
      }
    };

    const fieldMap = optionMaps[field];
    return fieldMap ? (fieldMap[code] || code) : code;
  };

  const openMushroomDetails = (index: number) => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const values = lines[index + 1]?.split(',') || [];

    const mushroomData: MushroomData = {
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
    };

    headers.forEach((header, headerIndex) => {
      const key = header.trim() as keyof MushroomData;
      if (key in mushroomData) {
        mushroomData[key] = values[headerIndex]?.trim() || '';
      }
    });

    setSelectedMushroom({
      data: mushroomData,
      prediction: predictions[index],
      index: index + 1
    });
    onOpen();
  };

  const processFile = useCallback(async (file: File) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t('batchPrediction.errors.invalidFileType'),
        description: t('batchPrediction.errors.supportedFormats'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let csvContent = '';

      if (file.type === 'text/csv') {
        csvContent = await file.text();
      } else {
        toast({
          title: t('batchPrediction.errors.excelNotSupported'),
          description: t('batchPrediction.errors.convertToCsv'),
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setCsvData(csvContent);
      setUploadedFile(file);

      toast({
        title: t('batchPrediction.success.fileUploaded'),
        description: t('batchPrediction.success.fileProcessed', { filename: file.name }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t('batchPrediction.errors.fileReadError'),
        description: error instanceof Error ? error.message : t('batchPrediction.errors.unknownError'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [t, toast]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <Card maxW="6xl" mx="auto" shadow="lg">
      <CardHeader>
        <Heading size="lg" color="teal.600">
          {t('batchPrediction.title')}
        </Heading>
        <Text color="gray.600" mt={2}>
          {t('batchPrediction.description')}
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontWeight="medium" mb={3}>
              {t('batchPrediction.uploadFile')}
            </Text>

            <Box
              border="2px dashed"
              borderColor={isDragOver ? "teal.400" : "gray.300"}
              borderRadius="lg"
              p={6}
              textAlign="center"
              bg={isDragOver ? "teal.50" : "gray.50"}
              transition="all 0.2s"
              cursor="pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
              _hover={{
                borderColor: "teal.400",
                bg: "teal.50"
              }}
            >
              <VStack spacing={3}>
                <Icon as={AttachmentIcon} w={8} h={8} color="teal.500" />
                <Text fontWeight="medium" color="teal.600">
                  {uploadedFile ? uploadedFile.name : t('batchPrediction.dragDropFile')}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t('batchPrediction.clickToSelect')}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {t('batchPrediction.supportedFormats')}
                </Text>
              </VStack>
            </Box>

            <Input
              id="file-input"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileSelect}
              display="none"
            />

            {uploadedFile && (
              <HStack mt={3} justify="space-between">
                <Text fontSize="sm" color="green.600">
                  ✓ {t('batchPrediction.fileUploaded')}: {uploadedFile.name}
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => {
                    setUploadedFile(null);
                    setCsvData('');
                    setPredictions([]);
                    setError(null);
                    const fileInput = document.getElementById('file-input') as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = '';
                    }
                  }}
                >
                  {t('batchPrediction.removeFile')}
                </Button>
              </HStack>
            )}
          </Box>

          <Box>
            <Text fontWeight="medium" mb={2}>
              {t('batchPrediction.csvData')}
            </Text>
            <Textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder={`cap-shape,cap-surface,cap-color,bruises,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-color,ring-number,ring-type,spore-print-color,population,habitat
x,s,y,t,p,f,c,n,k,e,e,s,s,w,w,w,o,p,k,s,u
f,s,y,t,a,f,c,b,k,e,c,s,s,w,w,w,o,p,n,n,g
x,y,y,t,l,f,c,b,h,e,r,s,s,w,w,p,o,p,k,s,m
b,s,w,t,p,f,c,n,n,e,e,s,s,w,w,e,o,p,w,d,w`}
              rows={8}
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)' }}
            />
            <Text fontSize="sm" color="gray.500" mt={2}>
              {t('batchPrediction.csvFormat')}
            </Text>
            <Text fontSize="xs" color="gray.400" mt={1}>
              <strong>Formato dos valores:</strong> Use os códigos de uma letra (ex: 'x' para convexo, 's' para liso, 'y' para amarelo, etc.)
            </Text>
          </Box>

          <HStack justify="center">
            <Button
              onClick={handleSubmit}
              colorScheme="teal"
              size="lg"
              isLoading={isLoading}
              loadingText={t('batchPrediction.processing')}
              isDisabled={!csvData.trim()}
              px={8}
            >
              {t('batchPrediction.classify')}
            </Button>
          </HStack>

          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {predictions.length > 0 && (
            <Box>
              <Heading size="md" mb={4} color="gray.700">
                {t('batchPrediction.results.title', { count: predictions.length })}
              </Heading>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>{t('batchPrediction.results.capColor')}</Th>
                      <Th>{t('batchPrediction.results.odor')}</Th>
                      <Th>{t('batchPrediction.results.capShape')}</Th>
                      <Th>{t('batchPrediction.results.status')}</Th>
                      <Th>{t('batchPrediction.results.actions')}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {predictions.map((prediction, index) => {
                      const lines = csvData.trim().split('\n');
                      const headers = lines[0].split(',');
                      const values = lines[index + 1]?.split(',') || [];

                      const getCapColorName = (code: string) => {
                        const colorMap: Record<string, string> = {
                          'n': t('mushroomOptions.cap-color.Brown'),
                          'b': t('mushroomOptions.cap-color.Buff'),
                          'c': t('mushroomOptions.cap-color.Cinnamon'),
                          'g': t('mushroomOptions.cap-color.Gray'),
                          'r': t('mushroomOptions.cap-color.Green'),
                          'p': t('mushroomOptions.cap-color.Pink'),
                          'u': t('mushroomOptions.cap-color.Purple'),
                          'e': t('mushroomOptions.cap-color.Red'),
                          'w': t('mushroomOptions.cap-color.White'),
                          'y': t('mushroomOptions.cap-color.Yellow')
                        };
                        return colorMap[code] || code;
                      };

                      const getOdorName = (code: string) => {
                        const odorMap: Record<string, string> = {
                          'a': t('mushroomOptions.odor.Almond'),
                          'l': t('mushroomOptions.odor.Anise'),
                          'c': t('mushroomOptions.odor.Creosote'),
                          'y': t('mushroomOptions.odor.Fishy'),
                          'f': t('mushroomOptions.odor.Foul'),
                          'm': t('mushroomOptions.odor.Musty'),
                          'n': t('mushroomOptions.odor.None'),
                          'p': t('mushroomOptions.odor.Pungent'),
                          's': t('mushroomOptions.odor.Spicy')
                        };
                        return odorMap[code] || code;
                      };

                      const getCapShapeName = (code: string) => {
                        const shapeMap: Record<string, string> = {
                          'b': t('mushroomOptions.cap-shape.Bell'),
                          'c': t('mushroomOptions.cap-shape.Conical'),
                          'x': t('mushroomOptions.cap-shape.Convex'),
                          'f': t('mushroomOptions.cap-shape.Flat'),
                          'k': t('mushroomOptions.cap-shape.Knobbed'),
                          's': t('mushroomOptions.cap-shape.Sunken')
                        };
                        return shapeMap[code] || code;
                      };

                      const capColorIndex = headers.findIndex(h => h.trim() === 'cap-color');
                      const odorIndex = headers.findIndex(h => h.trim() === 'odor');
                      const capShapeIndex = headers.findIndex(h => h.trim() === 'cap-shape');

                      const capColor = values[capColorIndex]?.trim() || '';
                      const odor = values[odorIndex]?.trim() || '';
                      const capShape = values[capShapeIndex]?.trim() || '';

                      return (
                        <Tr key={index}>
                          <Td fontWeight="medium">{index + 1}</Td>
                          <Td>{getCapColorName(capColor)}</Td>
                          <Td>{getOdorName(odor)}</Td>
                          <Td>{getCapShapeName(capShape)}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(prediction.prediction)}>
                              {prediction.prediction === 'edible'
                                ? t('batchPrediction.results.edible')
                                : t('batchPrediction.results.poisonous')}
                            </Badge>
                          </Td>
                          <Td>
                            <IconButton
                              aria-label={t('batchPrediction.results.viewDetails')}
                              icon={<ViewIcon />}
                              size="sm"
                              colorScheme="teal"
                              variant="ghost"
                              onClick={() => openMushroomDetails(index)}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>{t('batchPrediction.results.edibleCount')}</AlertTitle>
                    <AlertDescription>
                      {predictions.filter(p => p.prediction === 'edible').length} {t('batchPrediction.results.mushrooms')}
                    </AlertDescription>
                  </Box>
                </Alert>
                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>{t('batchPrediction.results.poisonousCount')}</AlertTitle>
                    <AlertDescription>
                      {predictions.filter(p => p.prediction === 'poisonous').length} {t('batchPrediction.results.mushrooms')}
                    </AlertDescription>
                  </Box>
                </Alert>
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t('batchPrediction.details.title', { number: selectedMushroom?.index })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMushroom && (
              <VStack spacing={4} align="stretch">
                <Alert status={selectedMushroom.prediction.prediction === 'edible' ? 'success' : 'error'}>
                  <AlertIcon />
                  <Box>
                    <AlertTitle>
                      {selectedMushroom.prediction.prediction === 'edible'
                        ? t('batchPrediction.details.edible')
                        : t('batchPrediction.details.poisonous')}
                    </AlertTitle>
                    <AlertDescription>
                      {t('batchPrediction.details.predictionMade')}
                    </AlertDescription>
                  </Box>
                </Alert>

                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <GridItem>
                    <Card h="full">
                      <CardHeader pb={2}>
                        <Heading size="sm" color="teal.600">
                          {t('singlePrediction.sections.cap')}
                        </Heading>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.cap-shape')}:
                            </Text>
                            <Text>{getMushroomOptionName('cap-shape', selectedMushroom.data['cap-shape'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.cap-surface')}:
                            </Text>
                            <Text>{getMushroomOptionName('cap-surface', selectedMushroom.data['cap-surface'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.cap-color')}:
                            </Text>
                            <Text>{getMushroomOptionName('cap-color', selectedMushroom.data['cap-color'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.bruises')}:
                            </Text>
                            <Text>{getMushroomOptionName('bruises', selectedMushroom.data['bruises'])}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card h="full">
                      <CardHeader pb={2}>
                        <Heading size="sm" color="teal.600">
                          {t('singlePrediction.sections.gills')}
                        </Heading>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.gill-attachment')}:
                            </Text>
                            <Text>{getMushroomOptionName('gill-attachment', selectedMushroom.data['gill-attachment'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.gill-spacing')}:
                            </Text>
                            <Text>{getMushroomOptionName('gill-spacing', selectedMushroom.data['gill-spacing'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.gill-size')}:
                            </Text>
                            <Text>{getMushroomOptionName('gill-size', selectedMushroom.data['gill-size'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.gill-color')}:
                            </Text>
                            <Text>{getMushroomOptionName('gill-color', selectedMushroom.data['gill-color'])}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card h="full">
                      <CardHeader pb={2}>
                        <Heading size="sm" color="teal.600">
                          {t('singlePrediction.sections.stalk')}
                        </Heading>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.stalk-shape')}:
                            </Text>
                            <Text>{getMushroomOptionName('stalk-shape', selectedMushroom.data['stalk-shape'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.stalk-root')}:
                            </Text>
                            <Text>{getMushroomOptionName('stalk-root', selectedMushroom.data['stalk-root'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.stalk-color-above-ring')}:
                            </Text>
                            <Text>{getMushroomOptionName('stalk-color-above-ring', selectedMushroom.data['stalk-color-above-ring'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.stalk-color-below-ring')}:
                            </Text>
                            <Text>{getMushroomOptionName('stalk-color-below-ring', selectedMushroom.data['stalk-color-below-ring'])}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card h="full">
                      <CardHeader pb={2}>
                        <Heading size="sm" color="teal.600">
                          {t('singlePrediction.sections.rings')}
                        </Heading>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.ring-number')}:
                            </Text>
                            <Text>{getMushroomOptionName('ring-number', selectedMushroom.data['ring-number'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.ring-type')}:
                            </Text>
                            <Text>{getMushroomOptionName('ring-type', selectedMushroom.data['ring-type'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.spore-print-color')}:
                            </Text>
                            <Text>{getMushroomOptionName('spore-print-color', selectedMushroom.data['spore-print-color'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.veil-color')}:
                            </Text>
                            <Text>{getMushroomOptionName('veil-color', selectedMushroom.data['veil-color'])}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card h="full">
                      <CardHeader pb={2}>
                        <Heading size="sm" color="teal.600">
                          {t('singlePrediction.sections.other')}
                        </Heading>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.odor')}:
                            </Text>
                            <Text>{getMushroomOptionName('odor', selectedMushroom.data['odor'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.population')}:
                            </Text>
                            <Text>{getMushroomOptionName('population', selectedMushroom.data['population'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.habitat')}:
                            </Text>
                            <Text>{getMushroomOptionName('habitat', selectedMushroom.data['habitat'])}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">
                              {t('singlePrediction.fields.stalk-surface-above-ring')}:
                            </Text>
                            <Text>{getMushroomOptionName('stalk-surface-above-ring', selectedMushroom.data['stalk-surface-above-ring'])}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              {t('batchPrediction.details.close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default BatchPredictionForm;


