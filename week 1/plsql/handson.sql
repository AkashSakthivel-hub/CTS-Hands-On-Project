DECLARE
    CURSOR loan_cursor IS
        SELECT c.CustomerID,
               c.Name,
               l.LoanID,
               l.DueDate,
               l.Amount
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30;
BEGIN
    FOR loan_record IN loan_cursor LOOP
        
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Dear ' || loan_record.Name ||
            ', your loan ID ' || loan_record.LoanID ||
            ' with amount ' || loan_record.Amount ||
            ' is due on ' || TO_CHAR(loan_record.DueDate, 'DD-MON-YYYY')
        );
        
    END LOOP;
END;
/