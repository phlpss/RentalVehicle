package db.com.rentalvehicle.anotation;

import db.com.rentalvehicle.validator.DriverLicenseNumberValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DriverLicenseNumberValidator.class)
public @interface DriverLicenseNumberConstraint {

  String message() default "Invalid driver license number";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
