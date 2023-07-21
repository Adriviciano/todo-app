// Clase para representar un elemento de la cola con prioridad
class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// Clase para representar la cola con prioridad
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // Método para agregar un elemento a la cola con prioridad
  enqueue(element, priority) {
    const queueElement = new QueueElement(element, priority);
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority > this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }

  // Método para remover y devolver el elemento con mayor prioridad
  dequeue(element) {
    if (this.isEmpty()) {
      return null;
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].element === element) {
        return this.items.splice(i, 1)[0].element;
      }
    }

    return null;
  }

  // Método para verificar si la cola con prioridad está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Método para obtener el tamaño de la cola con prioridad
  size() {
    return this.items.length;
  }

  // Método para obtener el elemento con mayor prioridad sin removerlo
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[0].element;
  }

  // Método para imprimir la cola con prioridad en la consola
  print() {
    const taskList = [];
    for (let i = 0; i < this.items.length; i++) {
      taskList.push(`${this.items[i].element}`);
    }
    return taskList;
  }
  
}

export default PriorityQueue;