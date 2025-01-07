// src/store/leadsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Lead {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  lead_status: string;
  gender: string;
  date_of_birth: string;
  address: string;
  insurance_type: string;
  policy_number: string;
  coverage_amount: string;
  preferred_plan: string;
  next_follow_up_date: string;
  source: string;
  company_name: string;
  referrer: string;
  notes: string;
}

interface LeadsState {
  leads: Lead[];
}

const initialState: LeadsState = {
  leads: [],
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
    },
    removeLead: (state, action: PayloadAction<number>) => {
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(lead => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
  },
});

export const { addLead, setLeads, removeLead, updateLead } = leadsSlice.actions;

export default leadsSlice.reducer;
