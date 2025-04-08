import AppwriteAuth from '@/lib/appwrite';
import { AuthContextType, Meal, MessOwner, Student, User } from '@/types/custom';
import { AppwriteException } from 'appwrite';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useState, useEffect, ReactNode, useReducer } from 'react';
import { ActivityIndicator, View } from 'react-native';








const AuthContext  :React.Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<Student | MessOwner| null>(null);
    const [meal ,setMeal] = useState<Meal[] | null>(null);
    const [loading, setLoading] = useState(true);
    const segments = useSegments();
    const router = useRouter();
    const appwrite = new AppwriteAuth();
    const getUserData = async (user: User) => {
        try {
            if (user?.labels.includes("student")) {
                // Fetch student data
                const { documents } = await appwrite.getStudent(user.email);
                const  meals = await appwrite.getMeals(documents[0].messOwner.$id);
                if (documents.length > 0) {
                    const studentData: typeof documents[0] = documents[0];
                    setUserData(studentData as unknown as Student);
                    setMeal(meals.documents.filter((meal) => new Date(meal.start_time) > new Date())as unknown as Meal[]);
                }
            } else {
                const { documents } = await appwrite.getMessOwner(user.email);
                if (documents.length > 0) {
                    const messOwnerData: typeof documents[0] = documents[0];
                    setUserData(messOwnerData as unknown as MessOwner);
                }
            }
        } catch (error) {
            console.log("Error fetching user data", error);
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const getUser  = await appwrite.getCurrentUser()
                setUser(getUser);
                getUserData(getUser);
            } catch (error) {
                const err = error as AppwriteException
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);


useEffect(() => {
            if (loading) return;
            const inAuthGroup = segments[0] === '(auth)';
            if (!user && !inAuthGroup) {
              router.replace('/login');
            } else if (user && inAuthGroup) {
              router.replace(user.labels.includes("messOwner") ? "/mess/(tabs)" : "/student/(tabs)");
            }
          }, [user, loading, segments]);
          

 const login = async (email: string, password: string) => {
        try {
            await appwrite.login(email, password);
            const getUser  = await appwrite.getCurrentUser()
            setUser(getUser);
            getUserData(getUser);
        } catch (error) {
            setUser(null);
            throw error;
        }
    };

const logout = async () => {
        await appwrite.logout();
        setUser(null);
        setUserData(null);
        router.replace('/login')
    };


 if (loading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
            );
          }
   return (
      <AuthContext.Provider value={{ user, loading, login, meal: meal || [], userData, logout, appwrite }}>
            {children}
        </AuthContext.Provider>
  
   )
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
