from flask import Flask, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL


api = Flask(__name__)

api.config['MYSQL_HOST'] = 'localhost'
api.config['MYSQL_USER'] = 'root'
api.config['MYSQL_PASSWORD'] = 'Mancity2003*'
api.config['MYSQL_DB'] = 'enrollment_db'

mysql = MySQL(api)



@api.route('/index')
def my_profile():
    response_body = {
        "welcome": "Welcome to the enrollment database",
    }
    return response_body



@api.route('/add_course', methods=['POST'])
def add_course():
    
    data = request.json
    course_id = data['courseID']
    instructor_id  = data['instructor_id']
    courseTitle = data['courseTitle']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM instructor WHERE instructor_id = %s",(instructor_id,))
    mysql.connection.commit()
    instructor_data = cur.fetchall()


    cur.execute("SELECT * FROM course WHERE course_id = %s",(course_id,))
    mysql.connection.commit()
    course_data  = cur.fetchall()

    if(instructor_data and (not course_data)):
        cur.execute("INSERT INTO course (course_id, course_title, instructor_id) VALUES (%s, %s, %s)", (course_id, courseTitle, instructor_id))
        mysql.connection.commit()
        message = "Course added successfully"
    elif(not instructor_data):
        message = "Could not add course: Instructor ID does not exist"
    else:
        message = "Could not add course: Conflicting course ID"

    cur.close()
    return jsonify({"message": message})

@api.route('/update_course', methods = ['POST'])
def update_course():
    data = request.json
    course_id = data['course_id']
    instructor_id = data['new_instructor_id']
    course_title = data['new_course_title']
    
    message = ""
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM instructor WHERE instructor_id = %s",(instructor_id,))
    mysql.connection.commit()

    instructor_data = cur.fetchall()

    if(not instructor_data and instructor_id):
        message += "Unable to modify course: Instructor ID does not exist"
        return jsonify({'message': message})
    if(instructor_id):   
        cur.execute("UPDATE course SET instructor_id = %s where course_id = %s",(instructor_id,course_id))
        mysql.connection.commit()
        message += "Instuctor changed to: " + str(instructor_id) +" ; "
    if(course_title):
        cur.execute("UPDATE course SET course_title = %s where course_id = %s",(course_title,course_id))
        mysql.connection.commit()
        message += "Course title changed to: " + str(course_title)

    cur.close()

    return jsonify({'message': message})

@api.route('/get_course', methods = ['POST'])
def get_course():
    data = request.json
    course_id = data['course_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM course WHERE course_id = %s",(course_id,))
    mysql.connection.commit()

    course_data  = cur.fetchall()
    cur.close()
    
    if(course_data):
        course_title = course_data[0][1]
        instructor_id = course_data[0][2]
        message = 'Course Found'
        return jsonify({'message': message,'course_title' : course_title, 'instructor_id':instructor_id})
    else:
        message = 'Course not found'
        return jsonify({'message': message})


@api.route('/delete_course', methods = ['POST'])
def delete_course():
    data = request.json
   
    course_id = data['course_id']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM course WHERE course_id = %s",(course_id,))
   
    mysql.connection.commit()
    data = cur.fetchall()

    if(data):
        cur.execute("DELETE FROM course WHERE course_id = %s", (course_id,))
        mysql.connection.commit()
        message = "Course deleted successfully"
    else:
        message = "Could not delete course: ID does not exist"
    
    cur.close()

    return jsonify({"message": message})



@api.route('/add_instructor', methods = ['POST'])
def add_instructor():
    data = request.json
   
    instructor_id = data['instructor_id']
    name  = data['name']
    course_dept = data['course_dept']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM instructor WHERE instructor_id = %s",(instructor_id,))
   
    mysql.connection.commit()
    data = cur.fetchall()
   
    if(not data):
        cur.execute("INSERT INTO instructor (instructor_id, name, course_dept) VALUES (%s, %s, %s)", (instructor_id, name, course_dept))
        mysql.connection.commit()
        message = "Instructor added successfully"
    else:
        message = "Could not add instructor: Conflicting instructor ID"

    cur.close()
    return jsonify({"message": message})

@api.route('/update_instructor', methods = ['POST'])
def update_instructor():
    data = request.json
    instructor_id = data['instructor_id']
    new_dept = data['new_department']
    new_name = data['new_name']
    cur = mysql.connection.cursor()
    message = ""
    if(new_name):   
        cur.execute("UPDATE instructor SET name = %s where instructor_id = %s",(new_name,instructor_id))
        mysql.connection.commit()
        message += "Name changed to: " + str(new_name) +" ; "
    if(new_dept):
        cur.execute("UPDATE instructor SET course_dept = %s where instructor_id = %s",(new_dept,instructor_id))
        mysql.connection.commit()
        message += "Course changed to: " + str(new_dept)
    if((not new_dept) and (not new_name)):
        message += "No values changed"

    cur.close()

    return jsonify({'message': message})

@api.route('/get_instructor', methods = ['POST'])
def get_instructor():
    data = request.json
    instructor_id = data['instructor_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM instructor WHERE instructor_id = %s",(instructor_id,))
    mysql.connection.commit()

    instructor_data  = cur.fetchall()
    cur.close()
    
    if(instructor_data):
        name = instructor_data[0][1]
        dept = instructor_data[0][2]
        message = 'Instructor Found'
        return jsonify({'message': message,'name' : name, 'dept':dept})
    else:
        message = 'Instructor not found'
        return jsonify({'message': message})

@api.route('/delete_instructor', methods = ['POST'])
def delete_instructor():
    data = request.json
   
    instructor_id = data['instructor_id']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM instructor WHERE instructor_id = %s",(instructor_id,))
   
    mysql.connection.commit()
    data = cur.fetchall()

    if(data):
        cur.execute("DELETE FROM instructor WHERE instructor_id = %s", (instructor_id,))
        mysql.connection.commit()
        message = "Instructor deleted successfully"
    else:
        message = "Could not delete instructor: ID does not exist"
    
    cur.close()

    return jsonify({"message": message})

    
  
    
@api.route('/add_student', methods = ['POST'])
def add_student():
    data = request.json
   
    student_id = data['student_id']
    name  = data['name']
    num_credits = data['num_credits']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM student WHERE student_id = %s",(student_id,))
   
    mysql.connection.commit()
    data = cur.fetchall()
   
    if(not data):
        cur.execute("INSERT INTO student (student_id, name, num_credits) VALUES (%s, %s, %s)", (student_id, name, num_credits))
        mysql.connection.commit()
        message = "Student added successfully"
    else:
        message = "Could not add student: Conflicting student ID"

    cur.close()
    return jsonify({"message": message})

@api.route('/get_student', methods = ['POST'])
def get_student():
    data = request.json
    student_id = data['student_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM student WHERE student_id = %s",(student_id,))
    mysql.connection.commit()

    student_data  = cur.fetchall()
    cur.close()
    
    if(student_data):
        name = student_data[0][1]
        num_credits = student_data[0][2]

        message = 'Student Found'
        return jsonify({'message': message,'name' : name, 'num_credits':num_credits})
    else:
        message = 'Student not found'
        return jsonify({'message': message})

@api.route('/update_student', methods = ['POST'])
def update_student():
    data = request.json
    student_id = data['student_id']
    new_num_cred = data['new_num_credits']
    new_name = data['new_name']
    cur = mysql.connection.cursor()
    message = ""
    if(new_name):   
        cur.execute("UPDATE student SET name = %s where student_id = %s",(new_name,student_id))
        mysql.connection.commit()
        message += "Name changed to: " + str(new_name) +" ; "
    if(new_num_cred):
        cur.execute("UPDATE student SET num_credits = %s where student_id = %s",(new_num_cred,student_id))
        mysql.connection.commit()
        message += "Num. credits changed to: " + str(new_num_cred)
    if((not new_num_cred) and (not new_name)):
        message += "No values changed"

    cur.close()

    return jsonify({'message': message})

@api.route('/delete_student', methods = ['POST'])
def delete_student():
    data = request.json
   
    student_id = data['student_id']

    message = ""

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM student WHERE student_id = %s",(student_id,))
   
    mysql.connection.commit()
    data = cur.fetchall()

    if(data):
        cur.execute("DELETE FROM student WHERE student_id = %s", (student_id,))
        mysql.connection.commit()
        message = "Student deleted successfully"
    else:
        message = "Could not delete student: ID does not exist"
    
    cur.close()

    return jsonify({"message": message})



@api.route('/enroll_student', methods = ['POST'])
def enroll_student():
    data = request.json
    
    student_id  = data['student_id']
    course_id   = data['course_id']

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM student_course WHERE student_id = %s AND course_id = %s",(student_id,course_id))
    mysql.connection.commit()

    message = ""

    info = cur.fetchall()
    if(not info):
         cur.execute("INSERT INTO student_course (student_id, course_id) VALUES (%s, %s)", (student_id, course_id))
         message = student_id + ' Added to course ' +course_id
         mysql.connection.commit()
    else:
        message = "Student already enrolled in this class"

    cur.close()

    return jsonify({'message': message})

@api.route('/drop_student', methods = ['POST'])
def drop_student():
    data = request.json
    
    student_id  = data['student_id']
    course_id   = data['course_id']

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM student_course WHERE student_id = %s AND course_id = %s",(student_id,course_id))
    mysql.connection.commit()

    message = ""

    info = cur.fetchall()
    if(info):
         cur.execute("DELETE FROM student_course WHERE student_id = %s AND course_id = %s",(student_id,course_id))
         message = student_id + ' Removed from course ' +course_id
         mysql.connection.commit()
    else:
        message = "Student is not enrolled in this class"

    cur.close()

    return jsonify({'message': message})

@api.route('/post_grade', methods = ['POST'])
def post_grade():
    data = request.json

    grade = data['grade']
    student_id = data['student_id']
    course_id = data['course_id']

    message = ""
    if(grade.isnumeric()):
        cur = mysql.connection.cursor()
        cur.execute("UPDATE student_course SET grade = %s where student_id = %s AND course_id = %s",(grade,student_id,course_id))
        mysql.connection.commit()
        cur.close()
        message = "Grade Updated to " + grade
    else:
        message = "Could not update grade"


    return jsonify({'message':message})

@api.route('/verify_student', methods = ['POST'])
def verify_grade():
    data = request.json
    student_id = data['student_id']
    course_id = data['course_id']
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM student_course WHERE student_id = %s AND course_id = %s",(student_id,course_id))
    mysql.connection.commit()

    info = cur.fetchall()

    message = ""
    if(info):
        message = "Student Enrolled"
        cur.execute("SELECT * FROM student WHERE student_id = %s",(student_id,))
        mysql.connection.commit()

        info = cur.fetchall()
        
        name =  info[0][1]
        num_credits = info[0][2]

        cur.execute("SELECT * FROM course WHERE course_id = %s",(course_id,))
        mysql.connection.commit()

        info = cur.fetchall()

       

        cou_name =  info[0][1]
        ins_id = info[0][2]


        cur.close()
        return jsonify({'message': message, 'student_name': name, 'num_creds': num_credits,  'course_title': cou_name, 'instructor_id': ins_id})
    else:
        cur.close()
        message = "Student Not Enrolled"
    
    return jsonify({'message': message,})

    
    

if __name__ == "__main__":
    api.run()