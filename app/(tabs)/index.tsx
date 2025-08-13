import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ?
          <ActivityIndicator size="small" />
        : moviesError ?
          <Text>Error: {moviesError?.message}</Text>
        : <View className="flex-1 mt-5">
            <SearchBar
              value=""
              onChangeText={() => {}}
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />
            <>
              <Text className="text-lg text-white font-bold">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </>
          </View>
        }
      </ScrollView>
    </View>
  );
}

type SearchBarProps = {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
};

export const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value || ""}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5bb"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};
