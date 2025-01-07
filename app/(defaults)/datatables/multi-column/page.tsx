import ComponentsDatatablesMultiColumn from '@/components/datatables/components-datatables-multi-column';
import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Multi Column Table',
};

const MultiColumn = () => {
    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                My Leads | Sales Sarthi
            </div>
            <ComponentsDatatablesMultiColumn />
        </div>
    );
};

export default MultiColumn;
