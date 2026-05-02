import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DemocraticNavigator from '../components/DemocraticNavigator';

// Mock the global fetch
global.fetch = vi.fn();

describe('PIN Code Validation Logic', () => {
  it('shows an error for PIN codes that are not exactly 6 digits', () => {
    render(<DemocraticNavigator />);
    
    // Step 1: Select Voter Type
    const newVoterBtn = screen.getByRole('button', { name: /select new voter/i });
    fireEvent.click(newVoterBtn);
    const continueBtn = screen.getByRole('button', { name: /continue to location step/i });
    fireEvent.click(continueBtn);
    
    // Step 2: Select State
    const stateSelect = screen.getByLabelText('State Selection Dropdown');
    fireEvent.change(stateSelect, { target: { value: 'Delhi' } });
    const nextBtn = screen.getByRole('button', { name: /continue to pin verification/i });
    fireEvent.click(nextBtn);
    
    // Step 3: Test PIN Validation
    const pinInput = screen.getByLabelText('6-Digit PIN Code');
    
    // Entering 5 digits should trigger validation error
    fireEvent.change(pinInput, { target: { value: '12345' } });
    
    // The exact string we use is "Error: PIN code must be exactly 6 digits"
    expect(screen.getByText(/Error: PIN code must be exactly 6 digits/i)).toBeDefined();
  });
});
