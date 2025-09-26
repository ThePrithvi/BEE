package APC.Lecture13;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class jdbc_demo {
    public static void main(String[] args) throws SQLException {
        // Connection building
        String db = "G26_db";
        String url = "jdbc:mysql://127.0.0.1:3306/" + db;
        String user = "root";
        String pass = "262381828MBspy@#";
        Connection c = DriverManager.getConnection(url,user,pass);

        // Statement created
        Statement st = c.createStatement();

        // Query created
        String createdb = "Create database G26_db";
        
        String create_Student = "insert";
        // Query Executed
        String create_table = "CREATE TABLE Students2(roll_number int(10),name,varChar(30),age int(10))";
        st.executeUpdate(Create_table);
        System.out.println(Create_Student_in_student_Table(62,"Prithvi",19));
        st.executeUpdate(Create_Student_in_student_Table(62,"Prithvi",19));
        st.executeUpdate(Create_Student_in_student_Table(2,"Thakur",18));
        st.executeUpdate(Create_Student_in_student_Table(3,"Harn",20));

        String del ="delete from students2 where roll_number=23";
        st.executeUpdate(del);

        String deleteTable = "DROP TABLE students";
        st.executeUpdate(deleteTable);

        String deleteDb = "DROP DATABASE g26_db";
        st.executeUpdate(dalateDb);

        // Connection closed
        c.close();

        System.out.println("Executed successfully and connection closed");
    }
    public static String Create_Student_in_student_Table(int roll_number,String name,int age) {
        String s = "insert into students2(roll_number,name,age) values("+roll_number+",\""+name+"\","+age+")";
        return s;
    }
}