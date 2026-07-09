from data import queries

def getFormRequest(tableName):
    return queries.fetch_all(tableName)

def createAdmissionRequest(data):

    studentName = data.get("studentName")
    dob = data.get("dob")
    gender = data.get("gender")
    admissionClass = data.get("admissionClass")
    address = data.get("address")
    fatherName = data.get("fatherName")
    fatherOccupation = data.get("fatherOccupation")
    fatherPhone = data.get("fatherPhone")
    motherName = data.get("motherName")
    motherOccupation = data.get("motherOccupation")
    motherPhone = data.get("motherPhone")
    previousschool = data.get("previousSchool")
    board = data.get("board")
    percentage = data.get("percentage")
    agreeTerms = data.get("agreeTerms")
    isCompleted = data.get("isCompleted", False)

    return queries.addAdmissionInfo(
        studentName,
        dob,
        gender,
        admissionClass,
        address,
        fatherName,
        fatherOccupation,
        fatherPhone,
        motherName,
        motherOccupation,
        motherPhone,
        previousschool,
        board,
        percentage,
        agreeTerms,
        isCompleted,
    )

def createInquiryRequest(data):
    name = data.get("name")
    contact = data.get("contact")
    subject = data.get("subject")
    message = data.get("message")
    isCompleted = data.get("isCompleted")

    return queries.addInquiryInfo(
        name,
        contact,
        subject,
        message,
        isCompleted
    )

def createCampusVisitRequest(data):
    visitorName = data.get("visitorName")
    contactNumber = data.get("contactNumber")
    guests = data.get("guests")
    visitDate = data.get("visitDate")
    visitSlot = data.get("visitSlot")
    isCompleted = data.get("isCompleted")

    return queries.addVisitInfo(
        visitorName,
        contactNumber,
        guests,
        visitDate,
        visitSlot,
        isCompleted
    )

def markAsReadRequest(id, tableName):
    return queries.markAsReadFormData(id, tableName)

def deleteFormRequest(id, tableName):
    return queries.deleteFormData(id, tableName)