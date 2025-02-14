class MyArray:
    def __init__(self, capacity, initial_value=None):
        self.capacity = capacity
        self.data = [initial_value] * capacity
        self.size = 0

    def __len__(self):
        return self.size

    def __getitem__(self, index):
        if not 0 <= index < self.size:
            raise IndexError("Index out of bounds")
        return self.data[index]
    
    def __setitem__(self, index, value):
         if not 0 <= index < self.size:
            raise IndexError("Index out of bounds")
         self.data[index] = value

    def append(self, value):
        if self.size == self.capacity:
            self._resize(self.capacity * 2)
        self.data[self.size] = value
        self.size += 1

    def insert(self, index, value):
         if not 0 <= index <= self.size:
            raise IndexError("Index out of bounds")
         if self.size == self.capacity:
            self._resize(self.capacity * 2)
         for i in range(self.size, index, -1):
            self.data[i] = self.data[i-1]
         self.data[index] = value
         self.size +=1

    def delete(self, index):
        if not 0 <= index < self.size:
            raise IndexError("Index out of bounds")
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i+1]
        self.size -= 1
        self.data[self.size] = None
        if self.size <= self.capacity // 4 and self.capacity > 10:
            self._resize(self.capacity // 2)

    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self.size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity