import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image, Check, Eye } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../services/adminApi';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'vehicles',
    imageUrl: '/assets/images/hero-innova-crysta.png',
    altText: '',
    displayOrder: 1,
    isActive: true,
  });

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await getGallery({ category: categoryFilter });
      setImages(res || []);
    } catch (err) {
      console.error('loadGallery error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, [categoryFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGalleryImage(form);
    setIsModalOpen(false);
    loadGallery();
  };

  const handleToggleActive = async (img) => {
    await updateGalleryImage(img._id, { isActive: !img.isActive });
    loadGallery();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteGalleryImage(deleteId);
    setDeleteId(null);
    loadGallery();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Media Gallery</h1>
          <p className="admin-page-sub">
            Upload and manage photos of the vehicle fleet, South India destinations and tourist attractions.
          </p>
        </div>

        <button
          type="button"
          className="btn-admin-primary"
          onClick={() => {
            setForm({
              title: '',
              category: 'vehicles',
              imageUrl: '/assets/images/hero-innova-crysta.png',
              altText: '',
              displayOrder: images.length + 1,
              isActive: true,
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add Media Photo</span>
        </button>
      </div>

      <div className="admin-toolbar">
        <select
          className="toolbar-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Media Categories</option>
          <option value="vehicles">Vehicles & Fleet</option>
          <option value="destinations">Destinations & Airport</option>
          <option value="trips">Tour Trips</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {images.map((img) => (
          <div key={img._id} className="admin-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: 180, background: '#f8fafc', overflow: 'hidden' }}>
              <img
                src={img.imageUrl}
                alt={img.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => setPreviewImg(img)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'rgba(7, 20, 38, 0.75)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Preview"
              >
                <Eye size={15} />
              </button>
            </div>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#071426', margin: 0 }}>
                  {img.title}
                </h4>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 4,
                    background: '#f1f5f9',
                    color: '#64748b',
                  }}
                >
                  {img.category}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <span
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: img.isActive ? '#15803d' : '#64748b',
                  }}
                  onClick={() => handleToggleActive(img)}
                >
                  {img.isActive ? '● Active' : '○ Hidden'}
                </span>

                <button
                  type="button"
                  className="btn-icon-action"
                  style={{ color: '#ef4444' }}
                  onClick={() => setDeleteId(img._id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Media Photograph"
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              Save Image
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Image Title *</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="e.g. Innova Crysta Airport Fleet"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select
                className="admin-form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="vehicles">Vehicles & Fleet</option>
                <option value="destinations">Destinations & Airport</option>
                <option value="trips">Tour Trips</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Display Order</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Image Path / Asset URL *</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="/assets/images/..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      {previewImg && (
        <Modal
          isOpen={!!previewImg}
          onClose={() => setPreviewImg(null)}
          title={previewImg.title}
          maxWidth={700}
        >
          <img
            src={previewImg.imageUrl}
            alt={previewImg.title}
            style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 8 }}
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Image"
        message="Are you sure you want to remove this media photo from the gallery?"
      />
    </div>
  );
}
