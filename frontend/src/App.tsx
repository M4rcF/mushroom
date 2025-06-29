import { Box, Container, Heading, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useTranslations } from './hooks/useTranslations';
import LanguageSelector from './components/LanguageSelector';
import SinglePredictionForm from './components/SinglePredictionForm';
import BatchPredictionForm from './components/BatchPredictionForm';
import MetricsDisplay from './components/MetricsDisplay';

function App() {
  const { t } = useTranslations();

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="6xl">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" color="teal.600" textAlign="center">
            {t('app.title')}
          </Heading>

          <LanguageSelector />

          <Tabs isFitted variant="enclosed" width="100%">
            <TabList mb="1em">
              <Tab>{t('app.tabs.single')}</Tab>
              <Tab>{t('app.tabs.batch')}</Tab>
              <Tab>{t('app.tabs.metrics')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SinglePredictionForm />
              </TabPanel>
              <TabPanel>
                <BatchPredictionForm />
              </TabPanel>
              <TabPanel>
                <MetricsDisplay />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;



