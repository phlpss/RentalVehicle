package db.com.rentalvehicle.validator;

import db.com.rentalvehicle.anotation.DriverLicenseNumberConstraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DriverLicenseNumberValidator implements ConstraintValidator<DriverLicenseNumberConstraint, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    throw new UnsupportedOperationException("Not supported yet.");
  }
}