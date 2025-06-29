import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';
import { useTranslations } from '../../hooks/useTranslations';
import { GiBrazilFlag } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";


const LanguageSelector: React.FC = () => {
  const { t, changeLanguage, isPortuguese, isEnglish } = useTranslations();

  return (
    <HStack spacing={2} justify="center" mb={4}>
      <Text fontSize="sm" color="gray.600">
        {t('app.language', 'Idioma:')}
      </Text>
      <Button
        size="sm"
        variant={isPortuguese ? 'solid' : 'outline'}
        colorScheme="teal"
        onClick={() => changeLanguage('pt')}
      >
        <GiBrazilFlag /> PT
      </Button>
      <Button
        size="sm"
        variant={isEnglish ? 'solid' : 'outline'}
        colorScheme="teal"
        onClick={() => changeLanguage('en')}
      >
        <LiaFlagUsaSolid /> EN
      </Button>
    </HStack>
  );
};

export default LanguageSelector;


