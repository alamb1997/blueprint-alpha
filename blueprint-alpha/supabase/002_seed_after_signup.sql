-- Run this only AFTER you create your first user in Supabase Authentication.
-- Replace YOUR_USER_UUID below with that user's UUID from Authentication > Users.

do $$
declare uid uuid := 'YOUR_USER_UUID';
begin
  insert into company_functions(user_id,name,description,status,sort_order) values
  (uid,'SEC / OTC Compliance','Filings, disclosure obligations, reporting deadlines, and public-company compliance.','Active',1),
  (uid,'Board','Board communications, approvals, unresolved issues, and governance.','Active',2),
  (uid,'Investor Relations','Press releases, shareholder communications, website, brand, and market messaging.','Active',3),
  (uid,'Audit','Audit requests, SmartSheets tracking, supporting documents, and outstanding items.','Active',4),
  (uid,'Capital and Financing','Lenders, investors, debt holders, capital raises, acquisition financing, and portfolio funding.','Active',5),
  (uid,'Finance','Invoices, payments, payroll, receivables, budgets, and coordination with Atlas Accounting.','Active',6),
  (uid,'Employees and Contractors','Internal and external personnel, assignments, agreements, and responsibilities.','Active',7),
  (uid,'Assets Owned','Parent-company assets, portfolio interests, subsidiaries, and operating entities.','Active',8);

  insert into platforms(user_id,name,description,stage) values
  (uid,'Lufkin Platform','The approximately 132-acre power and data center platform being acquired, including the biomass plant, warehouse, interconnection, land, and future operating entities.','Acquisition / Closing');

  insert into relationships(user_id,name,relationship_type,status) values
  (uid,'Morgan Stanley','Lender / Investor','Active'),
  (uid,'Jefferson Enterprise Energy','Seller','Active'),
  (uid,'Oncor','Utility','Active'),
  (uid,'F42','JV / Partner','Active'),
  (uid,'Centurion Financial','Lender / Investor','Active'),
  (uid,'Moody Capital','Lender / Investor','Active'),
  (uid,'Atlas Accounting','Vendor','Active');

  insert into tasks(user_id,title,priority,status,next_action) values
  (uid,'Review and confirm the Blueprint company structure','High','Not Started','Confirm corporate functions, Lufkin platform, and future operating entities.'),
  (uid,'Enter all active financing follow-ups','Critical','Not Started','Add one task or waiting item for every active lender and investor.'),
  (uid,'Enter current audit and SmartSheets requests','Critical','Not Started','Create one record for each outstanding audit request.'),
  (uid,'Enter invoices and payments due in the next 30 days','High','Not Started','Add each current payment obligation to Finance.');

  insert into timeline_events(user_id,event_date,title,description,event_type) values
  (uid,current_date,'Blueprint Alpha launched','Initial operating command center created for 1606 Corp.','System');
end $$;
