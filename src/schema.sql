create type worker_position as enum ('MANAGER', 'ASSISTANT');

alter type worker_position owner to rental;

create type purchase_status as enum ('PENDING', 'COMPLETED', 'CANCELLED');

alter type purchase_status owner to rental;

create type payment_type as enum ('CASH', 'APPLE_PAY', 'GOOGLE_PAY', 'IBAN');

alter type payment_type owner to rental;

create table office
(
    id             varchar(36) not null
        primary key,
    address        varchar(255),
    contact_number varchar(255),
    city           varchar(255)
);

alter table office
    owner to rental;

create table worker
(
    id             varchar(36)  not null
        primary key,
    full_name      varchar(255) not null,
    contact_number varchar(255) not null
        unique,
    email          varchar(255)
        unique,
    address        varchar(255),
    position       worker_position
);

alter table worker
    owner to rental;

create table client
(
    id                    varchar(36)  not null
        primary key,
    full_name             varchar(255) not null,
    contact_number        varchar(255) not null
        unique,
    email                 varchar(255)
        unique,
    rating                double precision,
    address               varchar(255),
    driver_license_number varchar(255) not null
);

alter table client
    owner to rental;

create table car
(
    id                varchar(36) not null
        primary key,
    vin               varchar(255),
    license_plate_num varchar(255),
    color             varchar(255),
    status            varchar(255),
    mileage           varchar(255),
    fuel_type         varchar(255),
    transmission_type varchar(255),
    brand             varchar(255),
    model             varchar(255),
    year              integer,
    category          varchar(255),
    seats_number      integer,
    daily_rental_cost double precision,
    office_id         varchar(36)
        references office
);

alter table car
    owner to rental;

create table payment
(
    id           varchar(36) not null
        primary key,
    payment_date date,
    fine         double precision,
    total        double precision,
    payment_type payment_type
);

alter table payment
    owner to rental;

create table supplier
(
    id             varchar(36) not null
        primary key,
    full_name      varchar(255),
    email          varchar(255),
    contact_number varchar(255),
    address        varchar(255)
);

alter table supplier
    owner to rental;

create table purchase
(
    id             varchar(36) not null
        primary key,
    purchase_date  date,
    total_price    double precision,
    invoice_number varchar(255),
    status         purchase_status,
    supplier_id    varchar(36)
        references supplier
);

alter table purchase
    owner to rental;

create table purchase_details
(
    id          varchar(36) not null
        primary key,
    amount      integer,
    price       double precision,
    purchase_id varchar(36)
        references purchase
);

alter table purchase_details
    owner to rental;

create table delivery
(
    id            varchar(36) not null
        primary key,
    delivery_date date,
    purchase_id   varchar(36) not null
        unique
        references purchase,
    office_id     varchar(36)
        references office
);

alter table delivery
    owner to rental;

create table rental
(
    id           varchar(36) not null
        primary key,
    rental_date  timestamp,
    rental_start timestamp,
    rental_end   timestamp,
    status       varchar(16)
        constraint rental_status_check
            check ((status)::text = ANY
                   ((ARRAY ['RESERVED'::character varying, 'PICKED_UP'::character varying, 'RETURNED'::character varying, 'INSPECTED'::character varying])::text[])),
    full_price   double precision,
    client_id    varchar(36)
        references client,
    worker_id    varchar(36)
        references worker,
    car_id       varchar(36)
        references car,
    payment_id   varchar(36)
        references payment
);

alter table rental
    owner to rental;

create table return_inspection
(
    id                    varchar(36) not null
        primary key,
    inspection_date       timestamp,
    status                varchar(16)
        constraint return_inspection_status_check
            check ((status)::text = ANY
                   ((ARRAY ['OK'::character varying, 'NEEDS_REPAIR'::character varying, 'FINED'::character varying])::text[])),
    notes                 varchar(1000),
    wear_level_percentage double precision,
    damage_penalty        double precision,
    cleaning_fee          double precision,
    rental_id             varchar(36) not null
        unique
        references rental,
    inspected_by          varchar(36) not null
        references worker
);

alter table return_inspection
    owner to rental;

create table damage_report
(
    id                    varchar(36) not null
        primary key,
    part_affected         varchar(255),
    description           varchar(1000),
    estimated_repair_cost double precision,
    inspection_id         varchar(36)
        references return_inspection
);

alter table damage_report
    owner to rental;

