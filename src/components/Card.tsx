import {
    View,
    Text,
    StyleSheet,
    FlatList,
  } from "react-native";
  
  import { Comment, Post } from "../types/Post";
  import { useState } from "react";
  import axios from "axios";
  import { baseUrl } from "../utils/constants";
  import { Button } from 'galio-framework';
  
  interface Props {
    post: Post;
  }
  
  const Card = ({ post }: Props) => {
    const [openComment, setOpenComments] = useState<boolean>(false);
    const [commentsList, setCommentsList] = useState<Comment[]>([]);
  
    const getComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `${baseUrl}/comments?postId=${post.id}`
        );
        setCommentsList(response.data);
      } catch (error) {}
    };
  
    const handleOpen = async () => {
      if (!openComment) {
        await getComments();
      }
      setOpenComments(!openComment);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
        <Button onPress={handleOpen} round size="small" color="success">Click me</Button>
        {openComment && (
          <FlatList
            data={commentsList}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.comment}>
                  {item.name} - {item.email}
                </Text>
                <Text style={styles.comment}>{item.body}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginVertical: 20,
      marginHorizontal: 10,
      borderRadius: 8,
      backgroundColor: "#F0E68C",
      borderWidth: 2,
      borderColor: "#FFD700",
    },    
    title: {
      fontSize: 22,
      color: "#000000",
      marginBottom: 10,
    },
    body: {
      fontSize: 18,
      color: "#000000",
      marginBottom: 10,
    },
    comment: {
      fontSize: 16,
      color: "#000000",
      marginBottom: 5,
    },
  });
  
  export default Card;