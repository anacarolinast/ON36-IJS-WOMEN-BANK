import axios from 'axios';
import { Address } from 'src/person/domain/address.interface'; 

export async function fetchAddressByCep(cep: string): Promise<Address> {
  const formattedCep = cep.replace(/\D/g, '');
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${formattedCep}`);
    const data = response.data;

    if (!data || data.error) {
      throw new Error('CEP not found or invalid');
    }

    return {
      cep: data.cep,
      state: data.state,
      city: data.city,
      district: data.neighborhood,
      address: data.street,
    };
  } catch (error) {
    throw new Error('Error fetching address from API');
  }
}
