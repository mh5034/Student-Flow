"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { initialTasks } from "@/data/initialTasks";

// TODO 1: Create TaskContext
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // TODO 2: Initialize tasks state with initialTasks

  // TODO 3: Load saved tasks from localStorage on initial mount (useEffect)

  // TODO 4: Save tasks to localStorage when tasks change (useEffect)

  // TODO 5: Implement addTask(newTask)

  // TODO 6: Implement toggleTask(taskId)

  // TODO 7: Implement deleteTask(taskId)

  return (
    <TaskContext.Provider
      value={{
        tasks: [],
        addTask: () => {},
        toggleTask: () => {},
        deleteTask: () => {},
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
