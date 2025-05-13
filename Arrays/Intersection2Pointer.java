import java.util.*;
class Intersection2Pointer
{
	public static void main(String args[])
	{
		int[] a=new int[]{1,3,5,5,7,9,2,6};
		int[] b=new int[]{2,3,5,4,7,10,6};
		//int[] u=new int[8];
		//int k=0;
		//Set<Integer> s=new TreeSet<Integer>();
		List<Integer> s = new ArrayList<>();//duplicates are allowed if they occur twice in both the arrays
		int j=0;
		int i=0;
		Arrays.sort(a);
		Arrays.sort(b);
		while(i<a.length && j<b.length)
		{
			if(a[i]==b[j])
			{
				s.add(a[i]);
				i++;
				j++;
			}
			else if(a[i]>b[j])
			{
				j++;
			}
			else{
			i++;
			}	
		}
			System.out.print(s);	
	}
}						
		
