"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { initialTasks } from "@/data/initialTasks";

// TODO 1: Create TaskContext
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // TODO 2: Initialize tasks state with initialTasks
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO 3: Load saved tasks from localStorage on initial mount (useEffect)

  useEffect(() => {
    const savedTasks = localStorage.getItem("course_tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      localStorage.setItem("course_tasks", JSON.stringify(initialTasks));
    }
    setIsLoaded(true);
  }, []);

  // TODO 4: Save tasks to localStorage when tasks change (useEffect)

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("course_tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  // TODO 5: Implement addTask(newTask)

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  // TODO 6: Implement toggleTask(taskId)

  const toggleTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task;
      });
    });
  };

  // TODO 7: Implement deleteTask(taskId)

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
