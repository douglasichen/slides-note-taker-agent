# CPSC 213: Introduction to Computer Systems - Unit 1b: Static Scalars and Arrays

## Course Overview
- **Institution**: University of British Columbia (UBC)
- **Semester**: 2024W1

### Course Instructors
- Mike Feeley
- Jonatan Schroeder
- Robert Xiao
- Jordon Johnson
- Geoffrey Tien

### Credits
- Slides adapted from contributions by multiple instructors.

### Learning Objectives
1. Identify components of a computer and their functions.
2. Explain ALU operations.
3. Describe data exchange in a CPU.
4. Understand basic machine instruction components.
5. Outline RISC instruction processing.
6. Translate array accesses and arithmetic between C and assembly.

### Instructional Approach
- Develop a model focused on what machines actually do using C.
- Design a simple instruction set inspired by real architectures.
- Use simulated processors to demonstrate execution of C programs.

## CPU and Instructions
### CPU Operation
- Execution of instructions occurs in three stages: Fetch, Decode, and Execute.
- Instructions include basic operations like loading/storing values and performing arithmetic.

### Instruction Types
- Simple CPU instructions cover reading, writing memory, controlling flow, and executing arithmetic/logical operations.

### Memory Access
- Accessing memory can slow down program execution, hence the use of registers for faster data handling.

### Instruction Set Architecture (ISA)
- Defines a processor's instructions, formats, and the relationship between machine code and assembly language.
- RISC vs. CISC philosophies guide instruction design.

## Array Variables and Memory Management
### Static vs. Dynamic Variables
- Static: Memory is allocated at compile time (global/static).
- Dynamic: Memory is allocated at runtime using functions like `malloc`.

### C vs. Java Array Handling
- C offers pointers and allows direct memory manipulation, whereas Java arrays are managed dynamically through references.

### Memory Layout
- Static variables have fixed addresses determined at compile time.
- Dynamic arrays have addresses assigned during execution with flexible memory allocation.

## RTL Concepts
- Register Transfer Language provides a pseudo-language for describing instruction semantics.
- Examples provided illustrate how memory and register instructions manipulate data.

### Instruction Examples
- Simple assembly instructions demonstrate assignments and array manipulations, translating high-level code into RTL and machine code.

## Dynamic Allocation in C
- Pointer usage and dynamic arrays require careful memory handling.
- Pointer arithmetic facilitates access to array elements, allowing for expressions like `*(b + i)` as an alternative to `b[i]`.

### Best Practices
- Ensure type safety and avoid out-of-bounds access to mitigate vulnerabilities inherent in C, particularly with pointer arithmetic.

## Conclusion
- This unit provides foundational knowledge in computer systems, emphasizing the implementation details of scalars and arrays in both C and assembly, equipping students for further studies in computer architecture and systems design.