drop table product_image;
create table product_image
(
	id number auto_increment,
	product_id number,
	image_id number,
	angle number,
	image_file clob
);

drop table image_pointer;
create table image_pointer
(
	id number auto_increment,
	product_id number,
	pointers clob
);

create table image_pointer(
product_id number,
image_pointer number,
id number,
aVal number,
bval number,
hVal number,
color varchar,
points clob
);