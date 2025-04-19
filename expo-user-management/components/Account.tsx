// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabase";
// import { StyleSheet, View, Alert } from "react-native";
// import { Button, Input } from "@rneui/themed";
// import { Session } from "@supabase/supabase-js";

// export default function Account({ session }: { session: Session }) {
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");
//   const [website, setWebsite] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");

//   useEffect(() => {
//     if (session) getProfile();
//   }, [session]);

//   async function getProfile() {
//     try {
//       setLoading(true);
//       if (!session?.user) throw new Error("No user on the session!");

//       const { data, error, status } = await supabase
//         .from("profiles")
//         .select(`username, website, avatar_url`)
//         .eq("id", session?.user.id)
//         .single();
//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         setUsername(data.username);
//         setWebsite(data.website);
//         setAvatarUrl(data.avatar_url);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert(error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function updateProfile({
//     username,
//     website,
//     avatar_url,
//   }: {
//     username: string;
//     website: string;
//     avatar_url: string;
//   }) {
//     try {
//       setLoading(true);
//       if (!session?.user) throw new Error("No user on the session!");

//       const updates = {
//         id: session?.user.id,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date(),
//       };

//       const { error } = await supabase.from("profiles").upsert(updates);

//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert(error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Input label="Email" value={session?.user?.email} disabled />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Username"
//           value={username || ""}
//           onChangeText={(text) => setUsername(text)}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Website"
//           value={website || ""}
//           onChangeText={(text) => setWebsite(text)}
//         />
//       </View>

//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Button
//           title={loading ? "Loading ..." : "Update"}
//           onPress={() =>
//             updateProfile({ username, website, avatar_url: avatarUrl })
//           }
//           disabled={loading}
//         />
//       </View>

//       <View style={styles.verticallySpaced}>
//         <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: "stretch",
//   },
//   mt20: {
//     marginTop: 20,
//   },
// });



import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Account({ session }: { session: Session }) {
  const user = session.user

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>🎉 You're logged in!</Text>
      <Text style={styles.email}>Welcome, {user.email}</Text>

      <Button title="Sign Out" onPress={handleSignOut} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e86de',
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
  },
  button: {
    marginTop: 20,
  },
})
