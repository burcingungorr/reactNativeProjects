import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slices/jobsSlice";
import JobItem from "../components/JobItem";

export default function JobListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { jobs, status } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  if (status === "loading") return <ActivityIndicator size="large" />;

  return (
    <View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobItem job={item} 
          onPress={() => navigation.navigate("JobDetail", { job: item })} />
        )}
      />
    </View>
  );
}
