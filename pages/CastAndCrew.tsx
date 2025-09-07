import React, { useMemo, useState, useEffect } from 'react';
import { useCastAndCrew } from '../hooks/useMockData';
import CastMemberCard from '../components/cast/CastMemberCard';
import Button from '../components/ui/Button';
import { ArrowDownIcon, ArrowUpIcon } from '../components/ui/Icon';
import Modal from '../components/ui/Modal';
import CastMemberForm, { CastMemberFormData } from '../components/cast/CastMemberForm';
import { CastMember } from '../types';

const CastAndCrew: React.FC = () => {
  const { data: initialMembers, loading } = useCastAndCrew();
  const [members, setMembers] = useState<CastMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'All' | 'Cast' | 'Crew'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'role'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CastMember | null>(null);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const displayedMembers = useMemo(() => {
    let filteredMembers = [...members];

    if (departmentFilter !== 'All') {
      filteredMembers = filteredMembers.filter(m => m.department === departmentFilter);
    }

    if (searchTerm.trim() !== '') {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        filteredMembers = filteredMembers.filter(m => 
            m.name.toLowerCase().includes(lowercasedSearchTerm) ||
            m.role.toLowerCase().includes(lowercasedSearchTerm)
        );
    }

    filteredMembers.sort((a, b) => {
      const valA = a[sortBy].toLowerCase();
      const valB = b[sortBy].toLowerCase();
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filteredMembers;
  }, [members, departmentFilter, sortBy, sortOrder, searchTerm]);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormModalOpen(true);
  };

  const handleOpenEditModal = (member: CastMember) => {
    setEditingMember(member);
    setFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormModalOpen(false);
    setEditingMember(null);
  };

  const handleSaveMember = (data: CastMemberFormData) => {
    if (editingMember) {
      // Update existing member
      const updatedMember: CastMember = { ...editingMember, ...data };
      setMembers(currentMembers =>
        currentMembers.map(m => (m.id === updatedMember.id ? updatedMember : m))
      );
    } else {
      // Add new member
      const newMember: CastMember = {
        id: `cc-${Date.now()}`,
        ...data,
        availability: [],
      };
      setMembers(currentMembers => [newMember, ...currentMembers]);
    }
    handleCloseModal();
  };


  return (
    <>
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={handleCloseModal} 
        title={editingMember ? 'Edit Cast/Crew Member' : 'Add New Cast/Crew Member'}
      >
        <CastMemberForm 
            onSubmit={handleSaveMember}
            onCancel={handleCloseModal}
            initialData={editingMember || undefined}
        />
      </Modal>

      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cast & Crew</h1>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <input
                type="search"
                placeholder="Filter by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition w-full sm:w-auto"
                aria-label="Filter by name or role"
            />
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value as 'All' | 'Cast' | 'Crew')}
              className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              aria-label="Filter by department"
            >
              <option value="All">All Departments</option>
              <option value="Cast">Cast</option>
              <option value="Crew">Crew</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'role')}
              className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              aria-label="Sort by"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
            </select>
            <Button variant="secondary" onClick={toggleSortOrder} className="p-2" aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}>
                {sortOrder === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            </Button>
            <Button onClick={handleOpenAddModal}>Add Member</Button>
          </div>
        </div>


        {loading && members.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-6 animate-pulse flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedMembers.map(member => (
              <CastMemberCard key={member.id} member={member} onEdit={handleOpenEditModal} />
            ))}
          </div>
        )}

        {displayedMembers.length === 0 && !loading && (
            <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No cast or crew members found for the selected filters.</p>
            </div>
        )}
      </div>
    </>
  );
};

export default CastAndCrew;