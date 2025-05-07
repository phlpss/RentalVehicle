package db.com.rentalvehicle.mapper;

import db.com.rentalvehicle.dto.CarDTO;
import db.com.rentalvehicle.dto.OfficeDTO;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.model.Office;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityMapper {

    public CarDTO toCarDTO(Car car) {
        if (car == null) {
            return null;
        }
        
        CarDTO dto = new CarDTO();
        dto.setId(car.getId());
        dto.setVin(car.getVin());
        dto.setLicensePlateNum(car.getLicensePlateNum());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setYear(car.getYear());
        dto.setColor(car.getColor());
        dto.setStatus(car.getStatus());
        dto.setMileage(car.getMileage());
        dto.setFuelType(car.getFuelType());
        dto.setTransmissionType(car.getTransmissionType());
        dto.setCategory(car.getCategory());
        dto.setSeatsNumber(car.getSeatsNumber());
        dto.setDailyRentalCost(car.getDailyRentalCost());
        
        if (car.getOffice() != null) {
            dto.setOfficeId(car.getOffice().getId());
            dto.setOfficeCity(car.getOffice().getCity());
            dto.setOfficeAddress(car.getOffice().getAddress());
        }
        
        return dto;
    }
    
    public List<CarDTO> toCarDTOList(List<Car> cars) {
        return cars.stream()
                .map(this::toCarDTO)
                .collect(Collectors.toList());
    }
    
    public OfficeDTO toOfficeDTO(Office office) {
        if (office == null) {
            return null;
        }
        
        OfficeDTO dto = new OfficeDTO();
        dto.setId(office.getId());
        dto.setCity(office.getCity());
        dto.setAddress(office.getAddress());
        
        return dto;
    }
    
    public List<OfficeDTO> toOfficeDTOList(List<Office> offices) {
        return offices.stream()
                .map(this::toOfficeDTO)
                .collect(Collectors.toList());
    }
} 