import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCountries } from './Api/api';

jest.mock('./Api/api', () => ({
  getCountries: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    getCountries.mockClear();
  });

  test('renders the App component', () => {
    render(<App />);
    const searchInputLabel = screen.getByText(/Search countries by name/i);
    expect(searchInputLabel).toBeInTheDocument();
  });

  test('handles search with results', async () => {
    const mockResults = [
      {
        name: 'Country 1',
        population_size: 1000000,
        percentage_of_total: 10,
      },
      {
        name: 'Country 2',
        population_size: 500000,
        percentage_of_total: 5,
      },
    ];

    getCountries.mockResolvedValueOnce({ data: mockResults });

    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Some country' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getCountries).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Country 1')).toBeInTheDocument();
      expect(screen.getByText('Population: 1.000.000')).toBeInTheDocument();
      expect(screen.getByText('10%')).toBeInTheDocument();
      expect(screen.getByText('Country 2')).toBeInTheDocument();
      expect(screen.getByText('Population: 500.000')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
    });
  });

  test('handles search with error', async () => {
    const errorMessage = 'Error occurred during search';
    getCountries.mockResolvedValueOnce({ error: errorMessage });

    render(<App />);
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getCountries).toHaveBeenCalledTimes(1);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});


