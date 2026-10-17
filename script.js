const JAVA_TEMPLATES = {
    BasicsScanner: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("=== Excellent Institute: Student Portal ===");
        System.out.print("Enter Student Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Course (DCA / PGDCA / BCA): ");
        String course = sc.nextLine();

        System.out.println("\\n--- Registration Confirmed ---");
        System.out.println("Student : " + name);
        System.out.println("Course  : " + course);
        System.out.println("Status  : Active");
    }
}`,

    MultiplicationTable: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number for multiplication table: ");
        int num = sc.nextInt();

        System.out.println("\\n--- Multiplication Table of " + num + " ---");
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
    }
}`,

    StarPattern: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of rows (e.g., 5): ");
        int rows = sc.nextInt();

        System.out.println("\\n--- Star Pyramid Pattern ---");
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,

    ArrayMaxMin: `public class Main {
    public static void main(String[] args) {
        int[] marks = {78, 92, 65, 88, 95, 71, 84};

        int max = marks[0];
        int min = marks[0];
        int sum = 0;

        System.out.print("Marks Array: ");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + " ");
            if (marks[i] > max) {
                max = marks[i];
            }
            if (marks[i] < min) {
                min = marks[i];
            }
            sum = sum + marks[i];
        }

        double average = (double) sum / marks.length;

        System.out.println("\\n\\n--- Array Analysis ---");
        System.out.println("Highest Mark : " + max);
        System.out.println("Lowest Mark  : " + min);
        System.out.println("Average Mark : " + average);
    }
}`,

    StudentOOP: `class Student {
    String name;
    int rollNo;
    double percentage;

    Student(String n, int r, double p) {
        name = n;
        rollNo = r;
        percentage = p;
    }

    void displayDetails() {
        System.out.println("Roll No    : " + rollNo);
        System.out.println("Name       : " + name);
        System.out.println("Percentage : " + percentage + "%");
        System.out.println("-----------------------------");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== OOP Class & Object Demo ===\\n");

        Student s1 = new Student("Aarav Sharma", 101, 88.5);
        Student s2 = new Student("Priya Patel", 102, 92.0);

        s1.displayDetails();
        s2.displayDetails();
    }
}`
};

let activeCategory = "all";

function filterCategory(category) {
    activeCategory = category;

    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach((btn) => {
        const btnText = btn.textContent.trim().toLowerCase();
        if (btnText === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    filterVaultCards();
}

function filterVaultCards() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const cards = document.querySelectorAll(".vault-card");

    cards.forEach((card) => {
        const cardCategory = (card.getAttribute("data-category") || "").toLowerCase();
        const cardKeywords = (card.getAttribute("data-keywords") || "").toLowerCase();
        const cardTitle = card.querySelector("h3")
            ? card.querySelector("h3").textContent.toLowerCase()
            : "";
        const cardDesc = card.querySelector("p")
            ? card.querySelector("p").textContent.toLowerCase()
            : "";

        const matchesCategory = activeCategory === "all" || cardCategory === activeCategory;
        const matchesSearch =
            query === "" ||
            cardTitle.includes(query) ||
            cardDesc.includes(query) ||
            cardKeywords.includes(query);

        if (matchesCategory && matchesSearch) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function loadTemplate(templateKey) {
    const code = JAVA_TEMPLATES[templateKey];
    if (!code) {
        return;
    }

    if (window.AndroidIDE && typeof window.AndroidIDE.loadCode === "function") {
        window.AndroidIDE.loadCode(code);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied to clipboard! (Open inside the Java Compiler Android app to inject directly into the IDE).");
        });
    } else {
        alert("Open this Vault inside the Java Compiler Android app to load templates directly.");
    }
}
