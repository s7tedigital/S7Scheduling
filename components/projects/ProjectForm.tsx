import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Project, ProjectStatus } from '../../types';
import Button from '../ui/Button';
import { Input, Textarea, Select } from '../ui/FormControls';

export type ProjectFormData = Omit<Project, 'id'>;

interface ProjectFormProps {
  onSubmit: SubmitHandler<ProjectFormData>;
  onCancel: () => void;
  initialData?: Partial<ProjectFormData>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ProjectFormData>({
    defaultValues: {
      status: ProjectStatus.Planning,
      budget: 0,
      description: '',
      director: '',
      producer: '',
      name: '',
      ...initialData,
    }
  });

  useEffect(() => {
    reset({
      status: ProjectStatus.Planning,
      budget: 0,
      description: '',
      director: '',
      producer: '',
      name: '',
      ...initialData,
    });
  }, [initialData, reset]);


  const startDate = watch('startDate');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Project Name"
        {...register('name', { required: 'Project name is required' })}
        error={errors.name?.message}
      />
      <Textarea
        id="description"
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="startDate"
          label="Start Date"
          type="date"
          {...register('startDate', { required: 'Start date is required' })}
          error={errors.startDate?.message}
        />
        <Input
          id="endDate"
          label="End Date"
          type="date"
          {...register('endDate', {
            required: 'End date is required',
            validate: value => value >= startDate || 'End date must be on or after start date'
          })}
          error={errors.endDate?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          id="status"
          label="Status"
          {...register('status', { required: true })}
          error={errors.status?.message}
        >
          {Object.values(ProjectStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
        <Input
          id="budget"
          label="Budget"
          type="number"
          step="1000"
          {...register('budget', { 
            required: 'Budget is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Budget must not be negative' }
          })}
          error={errors.budget?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="director"
          label="Director"
          {...register('director', { required: 'Director is required' })}
          error={errors.director?.message}
        />
        <Input
          id="producer"
          label="Producer"
          {...register('producer', { required: 'Producer is required' })}
          error={errors.producer?.message}
        />
      </div>
      <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;