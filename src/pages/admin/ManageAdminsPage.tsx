import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, UserPlus, CheckCircle, Clock, XCircle, Trash2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminUser {
  id: string;
  email: string;
  status: 'pending' | 'active' | 'deactivated';
  invited_by: string | null;
  invited_at: string;
  accepted_at: string | null;
  last_login_at: string | null;
  inviter_email?: string;
}

export default function ManageAdminsPage() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const adminsWithInviters = await Promise.all(
        (data || []).map(async (admin) => {
          if (admin.invited_by) {
            const { data: inviter } = await supabase
              .from('admin_users')
              .select('email')
              .eq('id', admin.invited_by)
              .maybeSingle();
            return { ...admin, inviter_email: inviter?.email };
          }
          return admin;
        })
      );

      setAdmins(adminsWithInviters);
    } catch (err: any) {
      console.error('Error fetching admins:', err);
      setError('Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInviteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(newAdminEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    const existingAdmin = admins.find(admin => admin.email.toLowerCase() === newAdminEmail.toLowerCase());
    if (existingAdmin) {
      setError('This email is already registered as an admin');
      return;
    }

    try {
      setInviting(true);

      const { data: currentAdmin } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', user?.email)
        .maybeSingle();

      const { data: newAdmin, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: newAdminEmail.toLowerCase(),
          status: 'pending',
          invited_by: currentAdmin?.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
        newAdminEmail.toLowerCase(),
        {
          redirectTo: `${window.location.origin}/admin/login`,
        }
      );

      if (inviteError) {
        await supabase.from('admin_users').delete().eq('id', newAdmin.id);
        throw inviteError;
      }

      setSuccess(`Invitation sent to ${newAdminEmail}`);
      setNewAdminEmail('');
      fetchAdmins();
    } catch (err: any) {
      console.error('Error inviting admin:', err);
      setError(err.message || 'Failed to invite admin. Please try again.');
    } finally {
      setInviting(false);
    }
  };

  const handleResendInvite = async (email: string) => {
    try {
      setError('');
      setSuccess('');

      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
        email,
        {
          redirectTo: `${window.location.origin}/admin/login`,
        }
      );

      if (inviteError) throw inviteError;

      setSuccess(`Invitation resent to ${email}`);
    } catch (err: any) {
      console.error('Error resending invite:', err);
      setError('Failed to resend invitation');
    }
  };

  const handleToggleStatus = async (adminId: string, currentStatus: string, email: string) => {
    if (email === user?.email) {
      setError('You cannot deactivate your own account');
      return;
    }

    const activeAdmins = admins.filter(a => a.status === 'active');
    if (activeAdmins.length === 1 && currentStatus === 'active') {
      setError('Cannot deactivate the last active admin');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const newStatus = currentStatus === 'active' ? 'deactivated' : 'active';

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', adminId);

      if (updateError) throw updateError;

      setSuccess(`Admin ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      fetchAdmins();
    } catch (err: any) {
      console.error('Error updating admin status:', err);
      setError('Failed to update admin status');
    }
  };

  const handleDeleteAdmin = async (adminId: string, email: string) => {
    if (email === user?.email) {
      setError('You cannot delete your own account');
      return;
    }

    if (!confirm(`Are you sure you want to delete admin ${email}? This action cannot be undone.`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      const { error: deleteError } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId);

      if (deleteError) throw deleteError;

      setSuccess('Admin deleted successfully');
      fetchAdmins();
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      setError('Failed to delete admin');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'deactivated':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4" />
            Deactivated
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Admini</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Ładowanie administratorów...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Brak administratorów</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zaproszony przez
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zaproszony w dniu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zaakceptowany dnia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{admin.email}</span>
                        {admin.email === user?.email && (
                          <span className="text-xs text-blue-600 font-medium">(Ty)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(admin.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.inviter_email || 'System'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(admin.invited_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(admin.accepted_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {admin.status === 'pending' && (
                          <button
                            onClick={() => handleResendInvite(admin.email)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            title="Resend invitation"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Resend
                          </button>
                        )}
                        {admin.email !== user?.email && (
                          <>
                            <button
                              onClick={() => handleToggleStatus(admin.id, admin.status, admin.email)}
                              className={`${
                                admin.status === 'active'
                                  ? 'text-red-600 hover:text-red-900'
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                            >
                              {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              title="Delete admin"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Uwagi dotyczące bezpieczeństwa:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Zaproszeni administratorzy otrzymają wiadomość e-mail z linkiem weryfikacyjnym.</li>
          <li>New admins must set their password through the verification link</li>
          <li>You cannot deactivate your own account</li>
          <li>At least one active admin must remain in the system</li>
          <li>Deactivated admins cannot access the admin panel</li>
        </ul>
      </div>
    </div>
  );
}
