package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.model.ReturnInspection;

import java.util.List;

public interface ReturnInspectionService {
    
    /**
     * Submit a return inspection for a rental
     * 
     * @param rentalId ID of the rental to be inspected
     * @param request Inspection details
     * @return Response with inspection details
     */
    ReturnInspectionResponse submitInspection(String rentalId, ReturnInspectionRequest request);
    
    /**
     * Get all completed inspections for a worker
     * 
     * @param workerId ID of the worker
     * @return List of return inspections
     */
    List<ReturnInspection> getCompletedInspections(String workerId);
}