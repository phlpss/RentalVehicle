package db.com.rentalvehicle.validator;

import db.com.rentalvehicle.anotation.ContactNumberConstraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContactNumberValidator implements
    ConstraintValidator<ContactNumberConstraint, String> {

  @Override
  public void initialize(ContactNumberConstraint contactNumber) {
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return value != null && value.matches("[0-9]+") && (value.length() > 8) && (value.length()
        < 14);
  }
}
