import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, FileText, User, Book, Users, CheckCircle, UploadCloud, AlertTriangle, Info, Loader2, Home } from 'lucide-react';
import { HashLink } from "react-router-hash-link";
import logo from "../assets/images/logo.png"; 

const MainIcon = () => (
    <div className="w-20 h-20 bg-gradient-to-br from-[#4B2E83] to-[#6B46C1] rounded-full flex items-center justify-center text-4xl text-white shadow-lg mb-6 mx-auto">
        🎓
    </div>
);

const IconButton = ({ children, className = '', Icon, onClick, type = 'button', disabled = false }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`btn flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 ${className} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
        {Icon && <Icon className={`w-5 h-5 transition-colors ${disabled && Icon === Loader2 ? 'animate-spin' : ''}`} />}
        {children}
    </button>
);

const STEPS = [
    { id: 1, title: "Personal Details", icon: User },
    { id: 2, title: "Academic Info", icon: Book },
    { id: 3, title: "Parent/Guardian", icon: Users },
    { id: 4, title: "Documents", icon: FileText },
    { id: 5, title: "Review & Submit", icon: CheckCircle }
];

const INITIAL_FORM_STATE = {
    firstName: '', lastName: '', dob: '', gender: 'male', bloodGroup: '', religion: '', category: '',
    address: '', city: '', state: '', pincode: '', phone: '', email: '',
    appliedClass: '', stream: '', lastSchool: '', lastClass: '', board: '', yearPassed: '', percentage: '', extracurricular: '',
    fatherName: '', fatherOccupation: '', fatherPhone: '', fatherEmail: '', fatherIncome: '',
    motherName: '', motherOccupation: '', motherPhone: '', motherEmail: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    declaration1: false, declaration2: false, declaration3: false, declaration4: false,
    photoUploaded: false, birthCertUploaded: false, marksheetUploaded: false, tcUploaded: false, categoryCertUploaded: false, incomeCertUploaded: false,
};

const Alert = ({ type, children }) => {
    let classes = "";
    let Icon = AlertTriangle;

    switch (type) {
        case 'warning': classes = "border-amber-300 bg-amber-50 text-amber-800"; Icon = AlertTriangle; break;
        case 'info': classes = "border-blue-300 bg-blue-50 text-blue-800"; Icon = Info; break;
        case 'success': classes = "border-green-300 bg-green-50 text-green-800"; Icon = CheckCircle; break;
        default: classes = "border-gray-300 bg-gray-50 text-gray-800";
    }

    return (
        <div className={`p-4 rounded-lg flex items-start gap-3 mb-8 border ${classes}`}>
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">{children}</div>
        </div>
    );
};

const FormGroup = ({ label, id, children, required = false, className = '', error }) => (
    <div className={`flex flex-col gap-1 mb-6 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
);

const RadioGroup = ({ label, name, options, value, onChange, required = false, error }) => (
    <FormGroup label={label} id={name} required={required} error={error}>
        <div className="flex items-center gap-6 mt-1">
            {options.map((option) => (
                <label key={option.value} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        required={required}
                        className={`
                            h-4 w-4 border-2 border-gray-300 rounded-full appearance-none transition-all duration-200 cursor-pointer
                            checked:bg-indigo-800 checked:border-indigo-800 checked:relative
                            checked:before:content-[''] checked:before:block checked:before:h-2 checked:before:w-2 checked:before:bg-white checked:before:rounded-full checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                        `}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    </FormGroup>
);

const Input = ({ error, required = false, ...props }) => (
    <input
        {...props}
        required={required}
        className={`px-4 py-2 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-1 w-full transition-shadow ${
            error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-800 focus:border-indigo-800'
        }`}
    />
);

const Select = ({ error, required = false, ...props }) => (
    <select
        {...props}
        required={required}
        className={`px-4 py-2 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-1 w-full appearance-none bg-white transition-shadow ${
            error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-800 focus:border-indigo-800'
        }`}
    >
        {props.children}
    </select>
);

const Textarea = ({ error, required = false, ...props }) => (
    <textarea
        {...props}
        required={required}
        className={`px-4 py-2 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-1 w-full transition-shadow ${
            error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-indigo-800 focus:border-indigo-800'
        }`}
    />
);

const Step1 = ({ formData, handleChange, errors }) => {
    const genderOptions = [
        { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' },
    ];

    return (
        <>
            <div className="font-semibold text-lg text-gray-800 mb-4">Personal Details</div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="First Name" id="firstName" required error={errors.firstName}>
                    <Input type="text" id="firstName" placeholder="Enter first name" required value={formData.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
                </FormGroup>
                <FormGroup label="Last Name" id="lastName" required error={errors.lastName}>
                    <Input type="text" id="lastName" placeholder="Enter last name" required value={formData.lastName} onChange={handleChange('lastName')} error={errors.lastName} />
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-3 gap-x-6">
                <FormGroup label="Date of Birth" id="dob" required error={errors.dob}>
                    <Input type="date" id="dob" required value={formData.dob} onChange={handleChange('dob')} error={errors.dob} />
                </FormGroup>
                <RadioGroup label="Gender" name="gender" options={genderOptions} value={formData.gender} onChange={handleChange('gender')} required error={errors.gender}/>
                <FormGroup label="Blood Group" id="bloodGroup" error={errors.bloodGroup}>
                    <Select id="bloodGroup" value={formData.bloodGroup} onChange={handleChange('bloodGroup')} error={errors.bloodGroup}>
                        <option value="">Select blood group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg.toLowerCase()}>{bg}</option>)}
                    </Select>
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Religion" id="religion" error={errors.religion}>
                    <Select id="religion" value={formData.religion} onChange={handleChange('religion')} error={errors.religion}>
                        <option value="">Select religion</option>
                        {['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'].map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
                    </Select>
                </FormGroup>
                <FormGroup label="Category" id="category" required error={errors.category}>
                    <Select id="category" required value={formData.category} onChange={handleChange('category')} error={errors.category}>
                        <option value="">Select category</option>
                        {['General', 'OBC', 'SC', 'ST', 'EWS'].map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                    </Select>
                </FormGroup>
            </div>
            <FormGroup label="Permanent Address" id="address" required error={errors.address}>
                <Textarea id="address" placeholder="Enter complete address" rows="3" required value={formData.address} onChange={handleChange('address')} error={errors.address} />
            </FormGroup>
            <div className="grid md:grid-cols-3 gap-x-6">
                <FormGroup label="City" id="city" required error={errors.city}>
                    <Input type="text" id="city" placeholder="Enter city" required value={formData.city} onChange={handleChange('city')} error={errors.city} />
                </FormGroup>
                <FormGroup label="State" id="state" required error={errors.state}>
                    <Select id="state" required value={formData.state} onChange={handleChange('state')} error={errors.state}>
                        <option value="">Select state</option>
                        {['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Delhi', 'Maharashtra'].map(s => <option key={s} value={s.toLowerCase().replace(' ', '-')}>{s}</option>)}
                    </Select>
                </FormGroup>
                <FormGroup label="PIN Code" id="pincode" required error={errors.pincode}>
                    <Input type="text" id="pincode" placeholder="Enter PIN code (6 digits)" required value={formData.pincode} onChange={handleChange('pincode')} error={errors.pincode} maxLength={10} />
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Phone Number" id="phone" required error={errors.phone}>
                    <Input type="tel" id="phone" placeholder="Enter 10 digit phone number" required value={formData.phone} onChange={handleChange('phone')} error={errors.phone} maxLength={10} />
                </FormGroup>
                <FormGroup label="Email Address" id="email" required error={errors.email}>
                    <Input type="email" id="email" placeholder="Enter email address" required value={formData.email} onChange={handleChange('email')} error={errors.email} />
                </FormGroup>
            </div>
        </>
    );
};

const Step2 = ({ formData, handleChange, errors }) => {
    const isHigherClass = formData.appliedClass === '11' || formData.appliedClass === '12';

    const classes = ['Playgroup', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const lastClasses = ['Playgroup', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const streams = [
        { value: 'science-pcm', label: 'Science (Physics, Chemistry, Mathematics)' },
        { value: 'science-pcb', label: 'Science (Physics, Chemistry, Biology)' },
        { value: 'commerce', label: 'Commerce' },
        { value: 'arts', label: 'Arts/Humanities' },
    ];

    useEffect(() => {
        if (!isHigherClass && formData.stream) {
            handleChange('stream')({ target: { value: '' } });
        }
    }, [isHigherClass, formData.appliedClass, handleChange, formData.stream]);

    return (
        <>
            <div className="font-semibold text-lg text-gray-800 mb-4">Academic Information</div>
            <FormGroup label="Applying for Class" id="appliedClass" required error={errors.appliedClass}>
                <Select id="appliedClass" required value={formData.appliedClass} onChange={handleChange('appliedClass')} error={errors.appliedClass}>
                    <option value="">Select class</option>
                    {classes.map(c => <option key={c} value={c}>{c}{c.match(/^\d+$/) ? (['1', '2', '3'].includes(c) ? (c === '1' ? 'st' : c === '2' ? 'nd' : 'rd') : 'th') : ''}</option>)}
                </Select>
            </FormGroup>
            <FormGroup label="Stream/Subject Combination" id="stream" required={isHigherClass} error={errors.stream}>
                <Select id="stream" required={isHigherClass} value={formData.stream} onChange={handleChange('stream')} disabled={!isHigherClass} error={errors.stream}>
                    <option value="">Select stream</option>
                    {streams.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </Select>
                {!isHigherClass && (
                    <p className="text-xs text-gray-500 mt-1">Stream selection is only required for Class 11th and 12th.</p>
                )}
            </FormGroup>

            <hr className="my-6 border-gray-200" />

            <div className="font-semibold text-lg text-gray-800 mb-4">Previous Academic Details</div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Last School Attended" id="lastSchool" required error={errors.lastSchool}>
                    <Input type="text" id="lastSchool" placeholder="Enter school name" required value={formData.lastSchool} onChange={handleChange('lastSchool')} error={errors.lastSchool} />
                </FormGroup>
                <FormGroup label="Last Class Completed" id="lastClass" required error={errors.lastClass}>
                    <Select id="lastClass" required value={formData.lastClass} onChange={handleChange('lastClass')} error={errors.lastClass}>
                        <option value="">Select class</option>
                        {lastClasses.map(c => <option key={c} value={c}>{c}{c.match(/^\d+$/) ? (['1', '2', '3'].includes(c) ? (c === '1' ? 'st' : c === '2' ? 'nd' : 'rd') : 'th') : ''}</option>)}
                    </Select>
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-3 gap-x-6">
                <FormGroup label="Board" id="board" required error={errors.board}>
                    <Select id="board" required value={formData.board} onChange={handleChange('board')} error={errors.board}>
                        <option value="">Select board</option>
                        {['CBSE', 'UP Board'].map(b => <option key={b} value={b.toLowerCase().replace(' ', '-')}>{b}</option>)}
                    </Select>
                </FormGroup>
                <FormGroup label="Year of Passing" id="yearPassed" required error={errors.yearPassed}>
                    <Select id="yearPassed" required value={formData.yearPassed} onChange={handleChange('yearPassed')} error={errors.yearPassed}>
                        <option value="">Select year</option>
                        {['2024', '2023', '2022', '2021'].map(y => <option key={y} value={y}>{y}</option>)}
                    </Select>
                </FormGroup>
                <FormGroup label="Percentage/Grade" id="percentage" required error={errors.percentage}>
                    <Input type="text" id="percentage" placeholder="Enter percentage (e.g., 85.5)" required value={formData.percentage} onChange={handleChange('percentage')} error={errors.percentage} />
                </FormGroup>
            </div>
            <FormGroup label="Extracurricular Activities & Achievements" id="extracurricular">
                <Textarea id="extracurricular" placeholder="Mention any sports, cultural activities, awards, etc." rows="3" value={formData.extracurricular} onChange={handleChange('extracurricular')} />
            </FormGroup>
        </>
    );
};

const Step3 = ({ formData, handleChange, errors }) => {
    const incomeOptions = [
        { value: 'below-2', label: 'Below ₹2 Lakh' }, { value: '2-5', label: '₹2-5 Lakh' }, { value: '5-10', label: '₹5-10 Lakh' },
        { value: '10-20', label: '₹10-20 Lakh' }, { value: 'above-20', label: 'Above ₹20 Lakh' },
    ];

    return (
        <>
            <div className="font-semibold text-lg text-gray-800 mb-4">Father's Information</div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Father's Name" id="fatherName" required error={errors.fatherName}>
                    <Input type="text" id="fatherName" placeholder="Enter father's name" required value={formData.fatherName} onChange={handleChange('fatherName')} error={errors.fatherName} />
                </FormGroup>
                <FormGroup label="Occupation" id="fatherOccupation" required error={errors.fatherOccupation}>
                    <Input type="text" id="fatherOccupation" placeholder="Enter occupation" required value={formData.fatherOccupation} onChange={handleChange('fatherOccupation')} error={errors.fatherOccupation} />
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-3 gap-x-6">
                <FormGroup label="Phone Number" id="fatherPhone" required error={errors.fatherPhone}>
                    <Input type="tel" id="fatherPhone" placeholder="Enter 10 digit phone number" required value={formData.fatherPhone} onChange={handleChange('fatherPhone')} error={errors.fatherPhone} maxLength={10} />
                </FormGroup>
                <FormGroup label="Email Address" id="fatherEmail" error={errors.fatherEmail}>
                    <Input type="email" id="fatherEmail" placeholder="Enter email address" value={formData.fatherEmail} onChange={handleChange('fatherEmail')} error={errors.fatherEmail} />
                </FormGroup>
                <FormGroup label="Annual Income" id="fatherIncome" required error={errors.fatherIncome}>
                    <Select id="fatherIncome" required value={formData.fatherIncome} onChange={handleChange('fatherIncome')} error={errors.fatherIncome}>
                        <option value="">Select range</option>
                        {incomeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Select>
                </FormGroup>
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="font-semibold text-lg text-gray-800 mb-4">Mother's Information</div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Mother's Name" id="motherName" required error={errors.motherName}>
                    <Input type="text" id="motherName" placeholder="Enter mother's name" required value={formData.motherName} onChange={handleChange('motherName')} error={errors.motherName} />
                </FormGroup>
                <FormGroup label="Occupation" id="motherOccupation" required error={errors.motherOccupation}>
                    <Input type="text" id="motherOccupation" placeholder="Enter occupation" required value={formData.motherOccupation} onChange={handleChange('motherOccupation')} error={errors.motherOccupation} />
                </FormGroup>
            </div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <FormGroup label="Phone Number" id="motherPhone" error={errors.motherPhone}>
                    <Input type="tel" id="motherPhone" placeholder="Enter phone number (optional)" value={formData.motherPhone} onChange={handleChange('motherPhone')} error={errors.motherPhone} maxLength={10} />
                </FormGroup>
                <FormGroup label="Email Address" id="motherEmail" error={errors.motherEmail}>
                    <Input type="email" id="motherEmail" placeholder="Enter email address (optional)" value={formData.motherEmail} onChange={handleChange('motherEmail')} error={errors.motherEmail} />
                </FormGroup>
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="font-semibold text-lg text-gray-800 mb-4">Emergency Contact</div>
            <div className="grid md:grid-cols-3 gap-x-6">
                <FormGroup label="Contact Name" id="emergencyName" required error={errors.emergencyName}>
                    <Input type="text" id="emergencyName" placeholder="Enter contact name" required value={formData.emergencyName} onChange={handleChange('emergencyName')} error={errors.emergencyName} />
                </FormGroup>
                <FormGroup label="Relation" id="emergencyRelation" required error={errors.emergencyRelation}>
                    <Input type="text" id="emergencyRelation" placeholder="Enter relation" required value={formData.emergencyRelation} onChange={handleChange('emergencyRelation')} error={errors.emergencyRelation} />
                </FormGroup>
                <FormGroup label="Phone Number" id="emergencyPhone" required error={errors.emergencyPhone}>
                    <Input type="tel" id="emergencyPhone" placeholder="Enter 10 digit phone number" required value={formData.emergencyPhone} onChange={handleChange('emergencyPhone')} error={errors.emergencyPhone} maxLength={10} />
                </FormGroup>
            </div>
        </>
    );
};

const DocumentUploadCard = ({ label, subtext, isUploaded, onUploadToggle, onFileChange }) => {
    const isRequired = label.includes('*');
    const inputId = label.split(' ')[0].toLowerCase().replace(/\*/g, '');
    const icon = isUploaded ? <CheckCircle /> : <UploadCloud />;

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={`p-4 border-2 rounded-lg text-center transition-all ${isUploaded ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300 hover:border-indigo-800 bg-white'}`}>
            <div className={`w-10 h-10 mx-auto mb-2 flex items-center justify-center text-2xl ${isUploaded ? 'text-green-600' : 'text-gray-400'}`}>
                {icon}
            </div>
            <label className="text-sm font-medium text-gray-700 block">{label}</label>
            <p className="text-xs text-gray-500 mb-3">{subtext}</p>
            
            <input
                type="file"
                id={`file-upload-${inputId}`}
                ref={fileInputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        onFileChange(e.target.files[0]);
                        if (!isUploaded) onUploadToggle(); 
                    }
                }}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
            />

            <button
                type="button"
                onClick={handleButtonClick}
                className={`
                    text-xs font-semibold py-1.5 px-3 rounded-full transition-colors duration-200
                    ${isUploaded
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                    }
                `}
            >
                <span className="icon inline-block mr-1">{isUploaded ? '✅' : '⬆️'}</span>
                {isUploaded ? 'Change File' : 'Upload Document'}
            </button>
            {isRequired && <p className="text-xs text-red-500 mt-1">* Required</p>}
        </div>
    );
};

const Step4 = ({ formData, setFormData, errors }) => {
    const handleFileChange = (docKey) => (file) => {
        console.log(`File selected for ${docKey}:`, file.name);
    };

    const handleUploadToggle = (docKey) => () => {
        setFormData(prev => ({ ...prev, [docKey]: !prev[docKey] }));
    };

    const uploadCards = [
        { label: "Student Photo *", subtext: "Passport size photo", stateKey: 'photoUploaded' },
        { label: "Birth Certificate *", subtext: "Official birth certificate", stateKey: 'birthCertUploaded' },
        { label: "Marksheet (Last Class) *", subtext: "Previous class marksheet", stateKey: 'marksheetUploaded' },
        { label: "Transfer Certificate *", subtext: "From previous school", stateKey: 'tcUploaded' },
        { label: "Category Certificate", subtext: "If applicable", stateKey: 'categoryCertUploaded' },
        { label: "Income Certificate", subtext: "For fee concession", stateKey: 'incomeCertUploaded' },
    ];


    return (
        <>
            <Alert type="info">
                Please upload clear, legible copies of all required documents. Maximum file size: 2MB per document. Accepted formats: PDF, JPG, PNG
            </Alert>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadCards.map((card) => (
                    <DocumentUploadCard
                        key={card.stateKey}
                        label={card.label}
                        subtext={card.subtext}
                        isUploaded={formData[card.stateKey]}
                        onUploadToggle={handleUploadToggle(card.stateKey)}
                        onFileChange={handleFileChange(card.stateKey)}
                    />
                ))}
            </div>
            
            {errors.document && <p className="text-red-500 text-sm mt-3 font-medium text-center">{errors.document}</p>}
        </>
    );
};

const Step5 = ({ formData, handleChange, errors }) => {
    const declarations = [
        { id: 'declaration1', label: 'I hereby declare that all the information provided in this application form is true and correct to the best of my knowledge.', checked: formData.declaration1 },
        { id: 'declaration2', label: 'I understand that any false information may lead to the cancellation of admission.', checked: formData.declaration2 },
        { id: 'declaration3', label: 'I agree to abide by the rules and regulations of Alok Inter College.', checked: formData.declaration3 },
        { id: 'declaration4', label: 'I consent to the school using the student\'s information for academic and administrative purposes.', checked: formData.declaration4 },
    ];

    return (
        <>
            <Alert type="success">
                Please review all information carefully before submitting your application.
            </Alert>
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={logo}
                        alt="Student Photo Placeholder"
                        className="w-[150px] h-[150px] rounded-full object-cover shadow-md mb-4"
                    />
                    <p className="text-gray-800 text-base font-medium">
                        Your application is now ready for submission. Please visit the school's admission cabin to move ahead with your admission.
                    </p>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Declaration</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                    {declarations.map(d => (
                        <div key={d.id} className="flex items-start gap-2 mb-3">
                            <input
                                type="checkbox"
                                id={d.id}
                                name={d.id}
                                checked={formData[d.id]}
                                onChange={handleChange(d.id)}
                                className={`mt-1 h-4 w-4 border-gray-300 rounded focus:ring-indigo-500 ${errors.declaration ? 'border-red-500 text-red-600' : 'text-indigo-600'}`}
                            />
                            <label htmlFor={d.id} className="text-sm text-gray-600 cursor-pointer">{d.label} <span className="text-red-500">*</span></label>
                        </div>
                    ))}
                    {errors.declaration && <p className="text-red-500 text-xs mt-3 font-medium">{errors.declaration}</p>}
                </div>
            </div>
        </>
    );
};

const SuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-xl shadow-2xl text-center border-t-8 border-green-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you for applying to Alok Inter College. Your application is now under review.
                    You will receive a confirmation email with your application ID shortly.
                </p>
                
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-semibold">Next Steps:</p>
                    <p>Please check the "After Submission" section for the Admission Test Date.</p>
                </div>

                <IconButton
                    Icon={Home}
                    className="bg-indigo-800 border border-indigo-800 text-white hover:bg-indigo-900 mx-auto"
                    onClick={() => window.location.reload()}
                ><HashLink smooth
                        to="/">Return to Home Page</HashLink>
                    
                </IconButton>
            </div>
        </div>
    );
};

const StepComponents = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
};

export default function Addmission() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const TotalSteps = STEPS.length;

    const handleChange = useCallback((field) => (event) => {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'radio') {
            value = event.target.value;
        }
        setFormData(prev => ({ ...prev, [field]: value }));
        
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            delete newErrors.document;
            delete newErrors.declaration;
            return newErrors;
        });
    }, []);

    const validateStep = (step) => {
        const errors = {};
        let isValid = true;

        const validateRequired = (field, message) => {
            if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
                errors[field] = message;
                isValid = false;
            }
        };

        const validateFormat = (field, regex, message) => {
            if (formData[field] && !regex.test(formData[field])) {
                errors[field] = message;
                isValid = false;
            }
        };

        if (step === 1) {
            validateRequired('firstName', 'First name is required.');
            validateRequired('lastName', 'Last name is required.');
            validateRequired('dob', 'Date of Birth is required.');
            validateRequired('category', 'Category is required.');
            validateRequired('address', 'Permanent address is required.');
            validateRequired('city', 'City is required.');
            validateRequired('state', 'State is required.');
            
            validateRequired('pincode', 'PIN Code is required.');
            validateFormat('pincode', /^\d{6}$/, 'PIN Code must be 6 digits.');

            validateRequired('phone', 'Phone number is required.');
            validateFormat('phone', /^\d{10}$/, 'Phone number must be 10 digits.');

            validateRequired('email', 'Email address is required.');
            validateFormat('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format.');
        } else if (step === 2) {
            validateRequired('appliedClass', 'Applying class is required.');
            if (['11', '12'].includes(formData.appliedClass)) {
                validateRequired('stream', 'Stream is required for Class 11th/12th.');
            }
            validateRequired('lastSchool', 'Last school attended is required.');
            validateRequired('lastClass', 'Last class completed is required.');
            validateRequired('board', 'Board is required.');
            validateRequired('yearPassed', 'Year of passing is required.');
            
            validateRequired('percentage', 'Percentage/Grade is required.');
            validateFormat('percentage', /^\d{1,3}(\.\d{1,2})?$/, 'Enter a valid percentage (e.g., 85.50).');
        } else if (step === 3) {
            validateRequired('fatherName', 'Father\'s name is required.');
            validateRequired('fatherOccupation', 'Father\'s occupation is required.');
            validateRequired('fatherIncome', 'Father\'s annual income is required.');
            validateRequired('fatherPhone', 'Father\'s phone number is required.');
            validateFormat('fatherPhone', /^\d{10}$/, 'Phone number must be 10 digits.');

            validateRequired('motherName', 'Mother\'s name is required.');
            validateRequired('motherOccupation', 'Mother\'s occupation is required.');
            if (formData.motherPhone) {
                validateFormat('motherPhone', /^\d{10}$/, 'Phone number must be 10 digits.');
            }
            if (formData.motherEmail) {
                validateFormat('motherEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format.');
            }

            validateRequired('emergencyName', 'Emergency contact name is required.');
            validateRequired('emergencyRelation', 'Emergency contact relation is required.');
            validateRequired('emergencyPhone', 'Emergency phone number is required.');
            validateFormat('emergencyPhone', /^\d{10}$/, 'Phone number must be 10 digits.');
        } else if (step === 4) {
            let docError = [];
            if (!formData.photoUploaded) { docError.push('Student Photo'); isValid = false; }
            if (!formData.birthCertUploaded) { docError.push('Birth Certificate'); isValid = false; }
            if (!formData.marksheetUploaded) { docError.push('Marksheet'); isValid = false; }
            if (!formData.tcUploaded) { docError.push('Transfer Certificate'); isValid = false; }
            
            if (docError.length > 0) {
                 errors.document = `Missing required documents: ${docError.join(', ')}.`;
            }
        } else if (step === 5) {
            if (!formData.declaration1 || !formData.declaration2 || !formData.declaration3 || !formData.declaration4) {
                errors.declaration = 'You must agree to all declarations before submitting.';
                isValid = false;
            }
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
             return;
        }

        if (currentStep < TotalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsSubmitting(true);
            
            setTimeout(() => {
                console.log('--- FORM SUBMISSION COMPLETE ---');
                console.log('Final Form Data:', formData);
                
                setIsSubmitting(false);
                setIsSubmitted(true);
            }, 2000);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (!isSubmitted) { 
            const cardTitleElement = document.getElementById('card-scroll-target');
            if (cardTitleElement) {
                cardTitleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [currentStep, isSubmitted]);


    if (isSubmitted) {
        return <SuccessPage />;
    }

    const CurrentStepComponent = StepComponents[currentStep];
    const currentStepTitle = STEPS[currentStep - 1]?.title || 'Admission Application';

    const nextButtonText = currentStep === TotalSteps ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Next Step';
    const nextButtonIcon = isSubmitting ? Loader2 : null; 
    
    const errors = validationErrors;
    
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-12 pb-12 font-[Poppins,sans-serif]">
            <section id="admission-form-section" className="w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <MainIcon />
                        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-2">Admission Application</h1>
                        <p className="text-gray-600 mb-1">Academic Year 2024-25</p>
                        <p className="text-lg font-medium text-orange-600">विद्या विनयम् ददाति</p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            {STEPS.map((step) => {
                                const isActive = currentStep >= step.id;
                                const CircleIcon = step.icon;
                                return (
                                    <div key={step.id} className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isActive ? 'bg-indigo-800 border-indigo-800 text-white' : 'border-gray-300 text-gray-400'}`}>
                                            <CircleIcon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-xs mt-1 text-center transition-colors duration-200 ${isActive ? 'text-indigo-800 font-medium' : 'text-gray-400'}`}>
                                            {step.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full mb-8 relative">
                            <div
                                className="h-full bg-indigo-800 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${(currentStep / TotalSteps) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Alert type="warning">
                            <strong>Last Date for Admission:</strong> March 31, 2024 |
                            <strong>Admission Test Date:</strong> April 15, 2024 |
                            <strong>Result Declaration:</strong> April 25, 2024
                        </Alert>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl backdrop-blur-sm">
                        <div className="p-6">
                            <h2 id="card-scroll-target" className="text-center text-xl font-semibold text-indigo-800 mb-6 border-b pb-4">
                                Step {currentStep}: {currentStepTitle}
                            </h2>

                            <form onSubmit={handleNext}>
                                <CurrentStepComponent
                                    formData={formData}
                                    handleChange={handleChange}
                                    setFormData={setFormData}
                                    errors={errors}
                                />

                                <div className="flex justify-between pt-6 border-t mt-4">
                                    <IconButton
                                        Icon={ChevronLeft}
                                        className="
                                            bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100
                                        "
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1 || isSubmitting}
                                    >
                                        Previous
                                    </IconButton>
                                    <IconButton
                                        Icon={nextButtonIcon}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`
                                            ${currentStep === TotalSteps
                                                ? 'bg-orange-600 border border-orange-600 text-white hover:bg-orange-700'
                                                : 'bg-indigo-800 border border-indigo-800 text-white hover:bg-indigo-900'
                                            }
                                        `}
                                    >
                                        {nextButtonText}
                                    </IconButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto mt-8 p-6 rounded-xl shadow-lg border border-indigo-300 bg-indigo-50">
                        <h3 className="text-lg font-semibold text-indigo-800 mb-4">After Submission</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3">
                                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-xl text-indigo-800 mx-auto mb-2">📄</div>
                                <p className="font-medium text-gray-700">Application Review</p>
                                <p className="text-sm text-gray-500">2-3 working days</p>
                            </div>
                            <div className="text-center p-3">
                                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-xl text-indigo-800 mx-auto mb-2">📚</div>
                                <p className="font-medium text-gray-700">Admission Test</p>
                                <p className="text-sm text-gray-500">April 15, 2024</p>
                            </div>
                            <div className="text-center p-3">
                                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-xl text-indigo-800 mx-auto mb-2">✔️</div>
                                <p className="font-medium text-gray-700">Result Declaration</p>
                                <p className="text-sm text-gray-500">April 25, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
