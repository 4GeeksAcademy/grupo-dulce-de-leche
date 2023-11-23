import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const PasswordReset = () => {
    const { actions } = useContext(Context);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState(null);
    const { reset_token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match before sending the reset request
        if (password !== confirmPassword) {
            // Handle password mismatch, e.g., display an error message
            setResetError("Passwords do not match");
            return;
        }

        try {
            console.log("Token:", reset_token);
            const response = await fetch(process.env.BACKEND_URL + `/resetpassword/${reset_token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_password: password }),
            });

            if (response.ok) {
                console.log('Password updated successfully');
                setResetSuccess(true);
                // Optionally, you can set a delay and then redirect
                // setTimeout(() => navigate('/login'), 3000);
            } else {
                console.error('Password update failed:', response.statusText);
                setResetError("Password reset failed. Please try again!");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
            setResetError("An error occurred. Please try again!");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row principal">
                {/* Columna izquierda */}
                <div className="col formulario-forgot">
                    <div className="row pb-5">
                        <div className="col-1"></div>
                        <div className="col-1">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="col-10">
                            <div className="back-login">
                                <Link to="/login">Back to login</Link>
                            </div>
                        </div>
                    </div>
                    <h2 className="recovery-title">Reset Password</h2>
                    <p className="recovery-instructions">
                        Enter your new password below.
                    </p>
                    <form onSubmit={handleSubmit}>
                        {resetSuccess && (
                            <div className="alert alert-success">
                                Your password was reset successfully. Please login!
                            </div>
                        )}
                        {resetError && (
                            <div className="alert alert-danger">
                                {resetError}
                            </div>
                        )}
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control form-control-recovery"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control form-control-recovery"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-recovery"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
                {/* Columna derecha */}
                <div className="col muestra"></div>
            </div>
        </div>
    );
};

export default PasswordReset;

