package db.com.rentalvehicle.dto;

import lombok.Data;
import java.util.List;

@Data
public class CarSearchSelectors {
    private List<String> models;
    private List<String> categories;
    private List<String> transmissionTypes;
    private List<String> fuelTypes;
    private List<String> cities;
    private Integer minYear;
    private Integer maxYear;
} 