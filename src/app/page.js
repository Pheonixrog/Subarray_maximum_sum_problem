"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRightIcon } from "@radix-ui/react-icons"

export default function MaxSubarraySolver() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])

  const solveMaxSubarray = (arr) => {
    if (arr.length === 0) return { sum: 0, subarray: [], start: 0, end: 0 }

    let maxSum = arr[0]
    let currentSum = arr[0]
    let start = 0
    let end = 0
    let tempStart = 0
    const newSteps = []

    newSteps.push(`Initialize: maxSum = ${maxSum}, currentSum = ${currentSum}`)

    for (let i = 1; i < arr.length; i++) {
      newSteps.push(`Considering element at index ${i}: ${arr[i]}`)

      // Update the current sum: either extend the current subarray or start a new one
      if (currentSum + arr[i] > arr[i]) {
        currentSum += arr[i]
        newSteps.push(`Extended current subarray. Current sum: ${currentSum}`)
      } else {
        currentSum = arr[i]
        tempStart = i
        newSteps.push(`Started new subarray at index ${i}. Current sum: ${currentSum}`)
      }

      // Check if we have found a new maximum sum
      if (currentSum > maxSum) {
        maxSum = currentSum
        start = tempStart
        end = i
        newSteps.push(`New maximum sum found: ${maxSum}, from index ${start} to ${end}`)
      } else {
        newSteps.push(`No new maximum. Current max sum remains: ${maxSum}`)
      }
    }

    setSteps(newSteps)
    return { sum: maxSum, subarray: arr.slice(start, end + 1), start, end }
  }

  const handleSolve = () => {
    try {
      const arr = JSON.parse(input)
      if (!Array.isArray(arr) || arr.some(item => typeof item !== 'number')) {
        throw new Error("Invalid input. Please enter an array of numbers.")
      }
      const solution = solveMaxSubarray(arr)
      setResult(solution)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <motion.h1 
          className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Maximum Subarray Solver
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-100">Input Array</CardTitle>
              <CardDescription className="text-gray-400">Enter an array of numbers (e.g., [-2, 1, -3, 4, -1, 2, 1, -5, 4])</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="[-2, 1, -3, 4, -1, 2, 1, -5, 4]"
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button onClick={handleSolve} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Solve
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-100">Algorithm Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {steps.map((step, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-700 p-3 rounded-lg text-gray-300"
                    >
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-100">Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-4">Maximum Sum: <span className="font-bold text-purple-400">{result.sum}</span></p>
                <p className="text-2xl mb-4">Subarray: <span className="font-bold text-pink-400">[{result.subarray.join(", ")}]</span></p>
                <p className="text-xl">Indices: <span className="font-bold text-green-400">{result.start} to {result.end}</span></p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
