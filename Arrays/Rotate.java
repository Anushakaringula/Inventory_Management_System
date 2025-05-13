import java.util.*;
/*class Rotate
{
	public static void main(String args[])
	{
		Integer[] a=new Integer[]{1,2,3,4,5};
		List<Integer> list=Arrays.asList(a);
		Collections.reverse(list);
		System.out.print(list);
	}
}*/
class Toreverse
{
	void reverse(int a,int b,int c[])
	{
		while(a<=b)
		{
			int temp=c[a];
			c[a]=c[b];
			c[b]=temp;
			a++;
			b--;
		}	
	}
}		
class Rotate
{
	public static void main(String args[])
	{
		int[] a=new int[]{1,2,3,4,5,6};
		Scanner s=new Scanner(System.in);
		int n;
		System.out.print("enter the no of rotations:");
		n=s.nextInt();
		Toreverse tr=new Toreverse();
		tr.reverse(0,n-1,a);
		tr.reverse(n,a.length-1,a);
		tr.reverse(0,a.length-1,a);
		for(int i=0;i<a.length;i++)
		{
			System.out.print(a[i]);
		}
	}
}
/*
//right rotate
class Solution {
        public void rotate(int a[], int k) 
        {
        int len = a.length;
        k = k % len;
        reverse(a, 0, len-k-1);
        reverse(a, len-k, len - 1);
        reverse(a, 0, len - 1);
    }
    void reverse(int a[],int b,int c)
    {
        while(b<=c)
        {
            int temp=a[b];
            a[b]=a[c];
            a[c]=temp;
            b++;
            c--;
        }
    }
}
class Main{ 
    public static void main(String args[]) {
        int[] a=new int[]{1,2,3,4,5};
        int k;
        Scanner s=new Scanner(System.in);
        Solution sl=new Solution();
        k=s.nextInt();
        sl.rotate(a,k);
        for(int i=0;i<a.length;i++)
        {
            System.out.print(a[i]);
        }

    }
}*/			
				
		
