'use client';

import { useState, useEffect } from 'react';

interface Lead {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    lead_status: string;
    gender?: string;
    date_of_birth?: string;
    address?: string;
    insurance_type?: string;
    policy_number?: string;
    coverage_amount?: string;
    preferred_plan?: string;
    next_follow_up_date?: string;
    source?: string;
    company_name?: string;
    referrer?: string;
    notes?: string;
  }
  

interface LeadFormProps {
    existingLead?: Lead;
    onClose: () => void;
}

const LeadForm = ({ existingLead, onClose }: LeadFormProps) => {
  // Initialize state for formData
  const [formData, setFormData] = useState<Lead>({
    id: existingLead ? existingLead.id : Date.now(),
    full_name: existingLead ? existingLead.full_name : '',
    email: existingLead ? existingLead.email : '',
    phone_number: existingLead ? existingLead.phone_number : '',
    lead_status: existingLead ? existingLead.lead_status : '',
    gender: existingLead ? existingLead.gender : '',
    date_of_birth: existingLead ? existingLead.date_of_birth : '',
    address: existingLead ? existingLead.address : '',
    insurance_type: existingLead ? existingLead.insurance_type : '',
    policy_number: existingLead ? existingLead.policy_number : '',
    coverage_amount: existingLead ? existingLead.coverage_amount : '',
    preferred_plan: existingLead ? existingLead.preferred_plan : '',
    next_follow_up_date: existingLead ? existingLead.next_follow_up_date : '',
    source: existingLead ? existingLead.source : '',
    company_name: existingLead ? existingLead.company_name : '',
    referrer: existingLead ? existingLead.referrer : '',
    notes: existingLead ? existingLead.notes : '',
  });

  // Load leads from LocalStorage
  const loadLeadsFromLocalStorage = (): Lead[] => {
    const storedLeads = localStorage.getItem('leads');
    return storedLeads ? JSON.parse(storedLeads) : [];
  };

  // Save leads to LocalStorage
  const saveLeadsToLocalStorage = (leads: Lead[]) => {
    localStorage.setItem('leads', JSON.stringify(leads));
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Load current leads from LocalStorage
    const currentLeads = loadLeadsFromLocalStorage();

    // If updating an existing lead
    if (existingLead) {
      const updatedLeads = currentLeads.map((lead) =>
        lead.id === formData.id ? formData : lead
      );
      saveLeadsToLocalStorage(updatedLeads);
    } else {
      // If adding a new lead
      const newLeads = [...currentLeads, formData];
      saveLeadsToLocalStorage(newLeads);
      alert('Lead added successfully!');
    }

    // Reset form after submission or close modal
    setFormData({
      id: Date.now(),
      full_name: '',
      email: '',
      phone_number: '',
      lead_status: '',
      gender: '',
      date_of_birth: '',
      address: '',
      insurance_type: '',
      policy_number: '',
      coverage_amount: '',
      preferred_plan: '',
      next_follow_up_date: '',
      source: '',
      company_name: '',
      referrer: '',
      notes: '',
    });
    onClose();
  };

  return (
<div className="form-container p-6 bg-white rounded shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    {existingLead ? 'Edit Lead' : 'Add New Lead'}
  </h2>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Full Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        name="full_name"
        placeholder="Enter Full Name"
        value={formData.full_name}
        onChange={handleInputChange}
        className="form-input w-full"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleInputChange}
        className="form-input w-full"
        required
      />
      <span className="text-gray-600 text-sm inline-block mt-1">
        We'll never share your email with anyone else.
      </span>
    </div>

    {/* Phone Number */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="text"
        name="phone_number"
        placeholder="Enter Phone Number"
        value={formData.phone_number}
        onChange={handleInputChange}
        className="form-input w-full"
        required
      />
    </div>

    {/* Lead Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Lead Status
      </label>
      <select
        name="lead_status"
        value={formData.lead_status}
        onChange={handleInputChange}
        className="form-select w-full"
        required
      >
        <option value="">Select Lead Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>
    </div>

    {/* Gender */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Gender
      </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        className="form-select w-full"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    {/* Date of Birth */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Date of Birth
      </label>
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Address */}
    <div className="col-span-1 lg:col-span-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address
      </label>
      <input
        type="text"
        name="address"
        placeholder="Enter Address"
        value={formData.address}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Insurance Type */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Insurance Type
      </label>
      <input
        type="text"
        name="insurance_type"
        placeholder="Enter Insurance Type"
        value={formData.insurance_type}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Policy Number */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Policy Number
      </label>
      <input
        type="text"
        name="policy_number"
        placeholder="Enter Policy Number"
        value={formData.policy_number}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Coverage Amount */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Coverage Amount
      </label>
      <input
        type="text"
        name="coverage_amount"
        placeholder="Enter Coverage Amount"
        value={formData.coverage_amount}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Preferred Plan */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Preferred Plan
      </label>
      <input
        type="text"
        name="preferred_plan"
        placeholder="Enter Preferred Plan"
        value={formData.preferred_plan}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Next Follow-Up Date */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Next Follow-Up Date
      </label>
      <input
        type="date"
        name="next_follow_up_date"
        value={formData.next_follow_up_date}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Source */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Source
      </label>
      <input
        type="text"
        name="source"
        placeholder="Enter Source"
        value={formData.source}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Company Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Company Name
      </label>
      <input
        type="text"
        name="company_name"
        placeholder="Enter Company Name"
        value={formData.company_name}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Referrer */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Referrer
      </label>
      <input
        type="text"
        name="referrer"
        placeholder="Enter Referrer"
        value={formData.referrer}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Notes */}
    <div className="col-span-1 lg:col-span-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Notes
      </label>
      <textarea
        name="notes"
        placeholder="Enter Notes"
        value={formData.notes}
        onChange={handleInputChange}
        className="form-input w-full"
      />
    </div>

    {/* Buttons */}
    <div className="col-span-1 lg:col-span-3 flex justify-end space-x-3">
      <button type="button" onClick={onClose} className="btn btn-secondary">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        {existingLead ? 'Update Lead' : 'Add Lead'}
      </button>
    </div>
  </form>
</div>

  );
};

export default LeadForm;
