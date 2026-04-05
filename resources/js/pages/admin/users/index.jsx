import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminUsers({ users, user: authUser }) {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRoleChange = (u) => {
        setSelectedUser(u);
        setShowRoleModal(true);
    };

    const handleDeleteClick = (u) => {
        setSelectedUser(u);
        setShowDeleteModal(true);
    };

    const handleRoleUpdate = (newRole) => {
        if (!selectedUser) {
            return;
        }
        router.put(
            route('admin.users.role', selectedUser.id),
            { role: newRole },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                },
            }
        );
    };

    const handleDeleteConfirm = () => {
        if (!selectedUser) {
            return;
        }
        router.delete(route('admin.users.delete', selectedUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedUser(null);
            },
        });
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'red';
            case 'management':
                return 'purple';
            case 'member':
                return 'blue';
            default:
                return 'gray';
        }
    };

    return (
        <AdminLayout user={authUser} currentPath="/admin/users">
            <Head title="Manage Users" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                    <p className="mt-2 text-gray-600">Accounts and roles (member, management, or admin).</p>
                </div>

                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {users.data?.map((userItem) => (
                            <li key={userItem.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                                <span className="text-sm font-medium text-purple-600">
                                                    {userItem.name?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">{userItem.name}</p>
                                                    <span
                                                        className={`ml-2 inline-flex items-center rounded-full bg-${getRoleColor(userItem.role)}-100 px-2.5 py-0.5 text-xs font-medium text-${getRoleColor(userItem.role)}-800`}
                                                    >
                                                        {userItem.role}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{userItem.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => handleRoleChange(userItem)}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-900"
                                            >
                                                Change role
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteClick(userItem)}
                                                className="text-sm font-medium text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) || (
                            <li>
                                <div className="px-4 py-4 text-center text-gray-500 sm:px-6">No users found</div>
                            </li>
                        )}
                    </ul>
                </div>

                {users.links && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {users.prev_page_url && (
                                <Link
                                    href={users.prev_page_url}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {users.next_page_url && (
                                <Link
                                    href={users.next_page_url}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {showRoleModal && (
                    <div className="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
                        <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
                            <h3 className="text-lg font-medium text-gray-900">Change role</h3>
                            <p className="mt-2 text-sm text-gray-500">Update role for &quot;{selectedUser?.name}&quot;</p>
                            <div className="mt-4 flex justify-center space-x-2">
                                {['member', 'management', 'admin'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => handleRoleUpdate(role)}
                                        className={`rounded-md px-4 py-2 text-sm font-medium ${
                                            selectedUser?.role === role ? 'bg-gray-300 text-gray-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowRoleModal(false)}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
                        <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
                            <h3 className="text-lg font-medium text-gray-900">Delete user</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Delete &quot;{selectedUser?.name}&quot;? This cannot be undone.
                            </p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteConfirm}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
