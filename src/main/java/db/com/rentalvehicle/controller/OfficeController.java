package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.OfficeDTO;
import db.com.rentalvehicle.mapper.EntityMapper;
import db.com.rentalvehicle.repository.OfficeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offices")
@RequiredArgsConstructor
@Tag(name = "Office Management", description = "APIs for managing offices")
public class OfficeController {

    private final OfficeRepository officeRepository;
    private final EntityMapper entityMapper;

    @Operation(
        summary = "Get all offices",
        description = "Retrieves all offices in the system"
    )
    @GetMapping
    public ResponseEntity<List<OfficeDTO>> getAllOffices() {
        return ResponseEntity.ok(entityMapper.toOfficeDTOList(officeRepository.findAll()));
    }
} 