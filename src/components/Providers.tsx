"use client";
import { AuthT } from "@/models/auth";
import { UserT } from "@/models/user";
import {
    AuthError,
    FacebookAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { auth, db } from "../../firebase/firebase.config";

interface AuthContextType {
    user: UserT;
    loading: boolean;
    signUp: (values: AuthT) => Promise<boolean | AuthError>;
    logIn: (values: AuthT) => Promise<void | AuthError>;
    googleLogin: () => Promise<void | AuthError>;
    facebookLogin: () => Promise<void | AuthError>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthContextProvider");
    }
    return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserT>({
        email: null,
        uid: null,
        approved: null,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        let unsubscribeDoc = () => {}; // Initialize to a no-op function

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                setLoading(true); // Ensure loading state is true when starting to fetch user data

                // Immediately fetch user document to ensure we have initial data
                getDoc(userRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            setUser({
                                email: user.email,
                                uid: user.uid,
                                approved: docSnap.data().approved,
                            });
                            setLoading(false); // Set loading to false after initial data is fetched
                        } else {
                            console.log("No such document!");
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user document:", error);
                        setLoading(false);
                    });

                // Setup real-time document listener
                unsubscribeDoc = onSnapshot(
                    userRef,
                    (doc) => {
                        if (doc.exists()) {
                            setUser((prevUser) => ({
                                ...prevUser,
                                approved: doc.data().approved,
                            }));
                        }
                    },
                    (error) => {
                        console.error(
                            "Error listening to user document:",
                            error,
                        );
                    },
                );
            } else {
                setUser({
                    email: null,
                    uid: null,
                    approved: null,
                });
                setLoading(false);
            }
        });

        // Cleanup function
        return () => {
            unsubscribeAuth();
            unsubscribeDoc(); // Unsubscribe from document listener when the component unmounts
        };
    }, []);

    const createUserDocument = async (user: UserT) => {
        await setDoc(doc(db, "users", user.uid!), {
            email: user.email,
            uid: user.uid,
            approved: user.approved,
        });
    };

    const handleUserAfterAuth = async (user: UserT) => {
        await createUserDocument(user);
    };

    const signUp = async (values: AuthT): Promise<boolean | AuthError> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password,
            );
            if (userCredential.user) {
                await sendEmailVerification(userCredential.user);
                // Inform the user to check their email for a verification link
                alert(
                    "Please verify your email before continuing to your profile.",
                );
            }
            await handleUserAfterAuth({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                approved: false,
            });
            return true;
        } catch (error) {
            return error as AuthError;
        }
    };

    const logIn = async (values: AuthT): Promise<void | AuthError> => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password,
            );
            const userRef = doc(db, "users", userCredential.user.uid);
            const docSnap = await getDoc(userRef);
            setUser({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                approved: docSnap.data()!.approved,
            });
        } catch (error) {
            return error as AuthError;
        }
    };

    const googleLogin = async (): Promise<void | AuthError> => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const isNewUser =
                result.user.metadata.creationTime ===
                result.user.metadata.lastSignInTime;
            if (isNewUser) {
                await handleUserAfterAuth({
                    email: result.user.email,
                    uid: result.user.uid,
                    approved: false,
                });
            } else {
                const userRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(userRef);
                setUser({
                    email: result.user.email,
                    uid: result.user.uid,
                    approved: docSnap.data()!.approved,
                });
            }
        } catch (error) {
            return error as AuthError;
        }
    };

    const facebookLogin = async (): Promise<void | AuthError> => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const isNewUser =
                result.user.metadata.creationTime ===
                result.user.metadata.lastSignInTime;
            if (isNewUser) {
                await handleUserAfterAuth({
                    email: result.user.email,
                    uid: result.user.uid,
                    approved: false,
                });
            } else {
                const userRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(userRef);
                setUser({
                    email: result.user.email,
                    uid: result.user.uid,
                    approved: docSnap.data()!.approved,
                });
            }
        } catch (error) {
            return error as AuthError;
        }
    };

    const logOut = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser({
                email: null,
                uid: null,
                approved: null,
            });
            router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signUp,
                logIn,
                googleLogin,
                facebookLogin,
                logOut,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
