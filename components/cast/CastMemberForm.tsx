import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CastMember } from '../../types';
import Button from '../ui/Button';
import { Input, Select } from '../ui/FormControls';
import CameraCapture from './CameraCapture';
import Modal from '../ui/Modal';

export type CastMemberFormData = Omit<CastMember, 'id' | 'availability'>;

interface CastMemberFormProps {
  onSubmit: SubmitHandler<CastMemberFormData>;
  onCancel: () => void;
  initialData?: CastMember;
}

const CastMemberForm: React.FC<CastMemberFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<CastMemberFormData>({
    defaultValues: initialData || {
      name: '',
      role: '',
      department: 'Crew',
      contact: '',
      photoUrl: 'https://picsum.photos/id/237/200/200', // Default placeholder
    }
  });

  useEffect(() => {
    reset(initialData || {
      name: '',
      role: '',
      department: 'Crew',
      contact: '',
      photoUrl: 'https://picsum.photos/id/237/200/200',
    });
  }, [initialData, reset]);

  const [isCameraOpen, setCameraOpen] = useState(false);
  const photoUrl = watch('photoUrl');

  const handlePhotoCapture = (imageDataUrl: string) => {
    setValue('photoUrl', imageDataUrl, { shouldValidate: true, shouldDirty: true });
    setCameraOpen(false);
  };
  
  return (
    <>
      <Modal isOpen={isCameraOpen} onClose={() => setCameraOpen(false)} title="Take Profile Photo">
        <CameraCapture 
            onCapture={handlePhotoCapture} 
            onCancel={() => setCameraOpen(false)}
        />
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700" />
            <div className="flex flex-col gap-2 items-center sm:items-start">
                <Button type="button" variant="secondary" onClick={() => setCameraOpen(true)}>
                    Take Photo
                </Button>
                 <p className="text-xs text-slate-500 text-center sm:text-left">Or provide an image URL in the field below.</p>
            </div>
        </div>

        <Input
          id="photoUrl"
          label="Photo URL"
          {...register('photoUrl')}
          error={errors.photoUrl?.message}
        />
        <Input
          id="name"
          label="Full Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="role"
            label="Role"
            {...register('role', { required: 'Role is required' })}
            error={errors.role?.message}
          />
          <Select
            id="department"
            label="Department"
            {...register('department', { required: true })}
          >
            <option value="Cast">Cast</option>
            <option value="Crew">Crew</option>
          </Select>
        </div>
        <Input
            id="contact"
            label="Contact (Email)"
            type="email"
            {...register('contact', { required: 'Contact email is required' })}
            error={errors.contact?.message}
        />
        <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? 'Update Member' : 'Add Member'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CastMemberForm;