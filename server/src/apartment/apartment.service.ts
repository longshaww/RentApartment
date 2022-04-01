import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartment.entity';

@Injectable()
export class ApartmentService {
  private apartments: Apartment[] = [
    { id: 0, name: 'Traveloka' },
    { id: 1, name: 'FPT Telecom' },
    { id: 2, name: 'Viettel Telecom' },
  ];

  findAll(name?: string): Apartment[] {
    if (name) {
      return this.apartments.filter((apartment) => apartment.name === name);
    }
    return this.apartments;
  }

  findById(apartmentId: number): Apartment {
    return this.apartments.find((apartment) => apartment.id === apartmentId);
  }

  createApartment(createApartmentDto: CreateApartmentDto): Apartment {
    const newApartment = { id: Date.now(), ...createApartmentDto };
    this.apartments.push(newApartment);
    return newApartment;
  }
}
