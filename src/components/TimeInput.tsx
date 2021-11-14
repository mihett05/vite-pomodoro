import React from 'react';
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

interface TimeInputProps {
  name: string;
  value: number;
  onChange: (value: number) => any;
  isDisabled: boolean;
}

function TimeInput({ name, value, onChange, isDisabled }: TimeInputProps) {
  return (
    <FormControl w="10em" isDisabled={isDisabled}>
      <FormLabel>{name}</FormLabel>
      <NumberInput max={1000} min={1} value={value} onChange={(value) => onChange(parseInt(value))}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default TimeInput;
